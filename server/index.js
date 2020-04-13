import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors';


import {logging} from './middleware/logging.js';
import router from './routes/index.js';


const app = express();
const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;

const mongoDB = process.env.CONN_STR;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

console.log("Connected to " + process.env.CONN_STR);

app.use(logging);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`your server is running on ${PORT}`);
})