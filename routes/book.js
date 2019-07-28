const express = require('express');
const router = express.Router();
const book = require('../models/Book');

router.post('/', async (req, res)=>{
    try{
        seat = await book.find({SeatNo: req.body.SeatNo});
        if(seat.length){
            res.json({message: "already Booked"});
        }else{
            seat = new book({
                Name: req.body.Name,
                Age: req.body.name,
                SeatNo: req.body.SeatNo,
                Date: req.body.Date,
                ShowTime: req.body.ShowTime
            });
            try{
                seat = await seat.save();
                res.json(seat);
            }catch(err){
                res.json({message: err});
            }
        }
    }
    catch(err){
        res.json({message: err});
    }
})

module.exports = router;