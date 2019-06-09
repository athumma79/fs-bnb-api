const express = require("express");
const cors = require("cors");
const db = require("../database");

const router = express.Router();

router.use(express.json());
router.use(cors());

router.get("", (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
        if(err) {
            return res.status(500).json({error: err});
        }
        res.json(result);
    });
});

router.post("/authentication", (req, res) => {
    const user = req.body;
    db.query("SELECT * FROM user WHERE email = ? AND password = ?", [user.email, user.password], (err, result) => {
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
    const user = req.body;
    db.query("INSERT INTO user SET ?", user, (err, result) => {
        if(err) {
            if(err.code == 'ER_DUP_ENTRY') {
                return res.status(400).json({message: "an account with this email already exists"});
            }
            return res.status(500).json({error: err});
        }
        const newUser = {
            id: result.insertId,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        }
        res.json(newUser);
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM user WHERE id = ?", id, (err, result) => {
        if(err) {
            return res.status(500).json({error: err});
        }
        res.json(result[0]);
    });
});

module.exports = router;