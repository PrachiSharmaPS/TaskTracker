const express = require('express');
const mongoose = require('mongoose')
const route = require('./route/route.js');
const multer= require("multer");


require('dotenv').config();

const app = express();
app.use( multer().any())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB, {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);

app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3001))
});

