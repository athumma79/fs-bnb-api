const express = require("express");
const cors = require("cors");
const db = require("../database");

const router = express.Router();

router.use(express.json());
router.use(cors());

router.get("", (req, res) => {
    db.query("SELECT * FROM provider", (err, result) => {
        if(err) {
            return res.status(500).json({error: err});
        }
        res.json(result);
    });
});

router.post("/authentication", (req, res) => {
    const provider = req.body;
    db.query("SELECT * FROM provider WHERE email = ? AND password = ?", [provider.email, provider.password], (err, result) => {
        if(err) {
            return res.status(500).json({error: err});
        }
        if(result.length === 0) {
            return res.status(400).json({message: "invalid login credentials"});
        }
        res.json(result[0]);
    });
});

router.post("", (req, res) => {
    const provider = req.body;
    db.query("INSERT INTO provider SET ?", provider, (err, result) => {
        if(err) {
            if(err.code == 'ER_DUP_ENTRY') {
                return res.status(400).json({message: err.sqlMessage});
            }
            return res.status(500).json({error: err});
        }
        const newProvider = {
            id: result.insertId,
            firstname: provider.firstname,
            lastname: provider.lastname,
            email: provider.email,
            password: provider.password
        }
        res.json(newProvider);
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM provider WHERE id = ?", id, (err, result) => {
        if(err) {
            return res.status(500).json({error: err});
        }
        res.json(result[0]);
    });
});

module.exports = router;