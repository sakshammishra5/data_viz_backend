const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))


app.use(require('./routes/auth'))
app.use(require('./routes/feature'))
app.use(require('./routes/filter'))


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(port||3000, () => {
            console.log(`http://localhost:${process.env.PORT||3000}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })