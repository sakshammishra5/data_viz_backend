const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const allowedOrigins = [
    'http://localhost:5173',
    'https://data-viz-frontend.vercel.app'
];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())


app.use(require('./routes/auth'))
app.use(require('./routes/feature'))
app.use(require('./routes/filter'))


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(port || 3000, () => {
            console.log(`http://localhost:${process.env.PORT || 3000}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })