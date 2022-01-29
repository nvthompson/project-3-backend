//Dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

//configure server settings
require('dotenv').config()

//expose our config variables
const { PORT, MONGODB_URL } = process.env

//middleware
app.use(cors());

app.get('/', (req, res)=>{
    res.send('Hello world')
})

//server listen
app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT:${PORT}`)
});