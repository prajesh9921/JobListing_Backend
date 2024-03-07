const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = require('./config/db');
const auth = require('./routes/auth');
const job = require('./routes/jobs');
const cookieParser = require('cookie-parser')
var cors = require('cors')
 

const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
dotenv.config();

app.use(cors())
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("connection established to MongoDB");
}).catch((err) => {
    console.log("error connecting to MongoDB", err);
});

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "localhost";

app.get('/', (req, res) => {
    res.json({message: "up and running!"});
})

app.use('/api/v1/auth', auth);
app.use('/api/v1/job', job);

// We use this when user typed in route which is not present so we come here show this message;
app.use('/*', (req, res) => {
    res.status(404).json({message: "Route not found"});
})

// this is error handler middleware we call this when there is error
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on port https://${HOST}:${PORT}`); 
})