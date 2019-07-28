const express = require('express');
const book = require('../models/Book');
const SeatmapRouter = express.Router();

SeatmapRouter.get('/:id', async (req, res)=>{
    try{
        seat = await book.find({SeatNo: req.params.id});
        res.send(seat);
    }catch(err){
        {message: err}
    }
});


module.exports = SeatmapRouter;