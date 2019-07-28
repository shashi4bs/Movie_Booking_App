express = require('express');
app = express();
mongoose = require('mongoose');
bodyParser = require('body-parser');
bookModel = require('./models/Book');

require('dotenv/config');
app.use(bodyParser.json());

DBurl = process.env.DATABASE_URI;

mongoose.connect(DBurl, {useNewUrlParser: true}, ()=>{
    console.log('connected to database');
});


///routes
app.get('/', (req, res)=>{
    res.send('Welcome');
})

app.listen(3000);