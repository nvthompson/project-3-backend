//Dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

//configure server settings
require('dotenv').config()

//expose our config variables
const { PORT, MONGODB_URL } = process.env

//MongoDB connection
mongoose.connect(MONGODB_URL)

//MongoDB event listeners
const db = mongoose.connection;

db
    .on('connected',()=> console.log('Connected to MongoDB'))
    .on('Disconnected',()=> console.log('Disconnected to MongoDB'))
    .on('Error',(error)=> console.log('MongoDB had an Error' + error.message))

//setting up a model for books
const bookStoreSchema = new mongoose.Schema({
    title: String,
    img: String,
    descript: String,
    price: Number,
    qty: Number
}, {timestamps});


//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))


//Routes

app.get('/', (req, res)=>{
    res.send('Hello world')
})

//server listen
app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT:${PORT}`)
});