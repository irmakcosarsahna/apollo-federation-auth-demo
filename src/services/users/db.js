const mongoose = require('mongoose');

const DATABASE_URL = 'mongodb+srv://irmakcosarsahna:123456Sb.@cluster0.cm5pj.mongodb.net/bikelime?retryWrites=true&w=majority';

const connectDB = () => {
    console.log('girdi', new Date())
    return mongoose.connect(DATABASE_URL, {useUnifiedTopology: true, useNewUrlParser: true}, err => {
        console.log('girdi', new Date())
        if (err){
            console.error('Connection to DB failed');
        } else{
            console.log('Connection to DB was successful');
        }
    })
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB connection failed"));

module.exports = connectDB;
