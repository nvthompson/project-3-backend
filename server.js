//Dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

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
    author: String,
    descript: String,
    price: Number,
    qty: Number
}, {timestamps: true});

const Books = mongoose.model('Books', bookStoreSchema)

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))


//Routes

app.get('/', (req, res)=>{
    res.send('Book Api')
})

//index route
app.get('/books', async (req, res)=>{
    try{
        res.json(await Books.find({}));
    } catch (error){
        res.status(400).json(error)
    }
});

//create route
app.post('/books', async (req, res)=>{
    try{
    res.json(await Books.create(req.body));
    } catch (error){
        res.status(400).json(error)
    }
})


//server listen
app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT:${PORT}`)
});