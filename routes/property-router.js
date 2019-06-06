const express = require("express");
const db = require("../database");

const router = express.Router();

router.use(express.json());

router.post("", (req, res) => {
    const property = req.body;
    db.query("INSERT INTO property SET ?", property, (err, result) => {
        if(err) {
            return res.status(500).json({error: err});
        }
        const newProperty = {
            id: result.insertId,
            name: property.name,
            location: property.location,
            imageUrl: property.imageUrl,
            price: property.price,
            providerId: property.providerId
        }
        res.json(newProperty);
    });
});

router.patch("", (req, res) => {
    const property = req.body;
    db.query("UPDATE property SET ? WHERE id = ?", [property, property.id], (err1) => {
        if(err1) {
            return res.status(500).json({error: err1});
        }
        db.query("SELECT * FROM property WHERE id = ?", property.id, (err2, result) => {
            if(err2) {
                return res.status(500).json({error: err2});
            }
            res.json(result);
        });
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM property WHERE id = ?", id, (err, result) => {
        if(err) {
            return res.status(500).json({error: err});
        }
        res.json(result);
    });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM property WHERE id = ?", id, (err, result) => {
        if(err) {
            return res.status(500).json({error: err});
        }
        res.json(result);
    });
});

module.exports = router;