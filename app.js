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
app.get("/",(req,res)=>{
    res.send("lorem ipsum")
})

// 'mongodb://localhost:27017/dataVisualization'
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })