const mongoose = require('mongoose');

//Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

//set Connection 
// mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
mongoose.connect(mongoURL)
//On creating connection mongoose create a object of connection
//So we have to read it with mongoose.connection
//mongoose maintain a default connection object representing the mongoDB connection
const db = mongoose.connection;

//Define Event listner for database connection
db.on('connected', () => {
    console.log("Database connected");
});
db.on('error', () => {
    console.log("Database connection Error");
});
db.on('disconnected', () => {
    console.log("Database disconnected");
});

module.exports = db;