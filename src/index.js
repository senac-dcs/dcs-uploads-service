const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');

const path = require("path");

const port = process.env.PORT || 3000;

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => 
    console.log("Connect DB!!!")
);

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(morgan('dev'));


app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(require('./routes/'))

app.listen(port);

app.get('/', (req, res, next) => {
    res.send(`welcome to /`);
})