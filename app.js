const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookModel = require('./models/Book');
const seatmapRouter = require('./routes/seatmap');
const bookRouter = require('./routes/book');
const cors = require('cors');

app.use(cors())
require('dotenv/config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use('/seatmap', seatmapRouter);
app.use('/book', bookRouter);
app.use(express.static(__dirname+'/static'));
DBurl = process.env.DATABASE_URI;

mongoose.connect(DBurl, {useNewUrlParser: true}, ()=>{
    console.log('connected to database');
});


///routes
app.get('/', async (req, res)=>{
    try{
        res.status(200).render('index');
    }catch(err){
        res.json({message: err});
    }
})


app.use((req, res, next)=>{
    res.status(404).render('404', {pageTitle: 'Page Not Found'})
});

app.listen(5000);
