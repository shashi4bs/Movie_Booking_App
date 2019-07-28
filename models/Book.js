const mongoose = require('mongoose');

bookingSchema = mongoose.Schema({
    Name:{
        type: String, 
        required: true
    },
    Age:{
        type: Number,
        required: false
    }, 
    SeatNo:{
        type: Number,
        required: true
    },
    BookingDate:{
        type: Date,
        default: Date.now
    },
    Date:{
        type: Date, 
        required: true
    },
    ShowTime:{
        type: Number,
        required:true
    }
});

module.exports = mongoose.model('book', bookingSchema);