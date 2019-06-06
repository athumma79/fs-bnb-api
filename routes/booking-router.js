const express = require("express");
const db = require("../database");

const router = express.Router();

router.use(express.json());

router.post("/:id/bookings", (req, res) => {
    const body = req.body;
    const booking = {
        dateFrom: body.dateFrom,
        dateTo: body.dateTo,
        userId: body.userId,
        propertyId: req.params.id,
        status: "NEW"
    }
    db.query("INSERT INTO booking SET ?", booking, (err, result) => {
        if(err) {
            return res.status(500).json({error: err});
        }
        const newBooking = {
            id: result.insertId,
            dateFrom: booking.dateFrom,
            dateTo: booking.dateTo,
            userId: booking.userId,
            propertyId: booking.propertyId,
            status: booking.status
        }
        res.json(newBooking);
    });
});

router.patch("/:id/bookings/:bookId", (req, res) => {
    const body = req.body;
    const booking = {
        userId: body.id,
        status: body.status
    }
    const bookingId = req.params.bookId;
    const propertyId = req.params.id;
    db.query("UPDATE booking SET ? WHERE id = ? && propertyId = ?", [booking, bookingId, propertyId], (err1) => {
        if(err1) {
            return res.status(500).json({error: err1});
        }
        db.query("SELECT * FROM booking WHERE id = ? && propertyId = ?", [bookingId, propertyId], (err2, result) => {
            if(err2) {
                return res.status(500).json({error: err2});
            }
            res.json(result);
        });
    });
});

router.get("/:id/bookings", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM booking WHERE propertyId = ?", id, (err, result) => {
        if(err) {
            return res.status(500).json({error: err});
        }
        res.json(result);
    });
});

module.exports = router;