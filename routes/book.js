const express = require('express');
const router = express.Router();
const book = require('../models/Book');
const {check, validationResult} = require('express-validator');

router.get('/:id', (req, res)=>{
    res.status(200).render('makeBooking', {SeatNo:req.params.id, pageTitle:'Make Booking', date:Date.now});
})
router.get('/', async (req, res)=>{
    try{
        seats = await book.find({}, {SeatNo:1});
        seatno = []
        seats.forEach(element => {
            seatno.push(element.SeatNo);
        });
        res.status(200).render('book', {pageTitle:'BOOKON - HOME', seatno: seatno})
    }catch(err){
        res.json({message: err});
    }
});
router.post('/', [
    check('Name').isLength({min:4}),
    check('Age').isNumeric()
    ],
    async (req, res)=>{
    try{
        val =  validationResult(req);
        if(!val.isEmpty()){
            console.log('validation error')
            return res.status(422).json({error:val.array()});
        }
        console.log(req.body)
        newPost = new book({
            Name : req.body.Name,
            Age: req.body.Age,
            SeatNo: req.body.SeatNo,
            Date: req.body.Date,
            ShowTime: req.body.ShowTime,
        });
        seat = await book.find({SeatNo: req.body.SeatNo});
        if(seat.length){
            res.json({message: "already Booked"});
        }else{
            date = new Date(req.body.Date);
            time = req.body.ShowTime.toString().split(':');
            date.setUTCHours(Number.parseInt(time[0]), Number.parseInt(time[1]));
            seat = new book({
                Name: req.body.Name,
                Age: req.body.Age,
                SeatNo: req.body.SeatNo,
                Date: date,
            });
            try{
                seat = await seat.save();
                res.redirect('back');
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