const express = require('express');
const book = require('../models/Book');
const SeatmapRouter = express.Router();

SeatmapRouter.get('/:id', async (req, res)=>{
    try{
        seat = await book.find({SeatNo: req.params.id});
        if(seat.length>0){
            res.json(seat);
        }
        else
            res.json({message: "SEAT AVAILABLE"});
    }catch(err){
        {message: err}
    }
});



module.exports = SeatmapRouter;