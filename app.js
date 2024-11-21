const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


app.use(require('./routes/auth'))
app.use(require('./routes/feature'))
// app.use(require("./routes/addfeature"))
// app.use(require("./routes/feature"))

mongoose.connect(process.env.MONGO_URL||'mongodb://localhost:27017/dataVisualization')
    .then(() => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })