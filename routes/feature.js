const express = require("express")
const { format } = require("date-fns")
const router = express.Router()
const Feature = require("../model/feature")
const { getFilteredFeatures } = require("../utils/pipline")
const { formatDate } = require("../utils/formatDate")



router.post("/getChartData", async (req, res) => {
    const { age, gender, dateRange } = req.body
    let convertedDate = dateRange.map((item) => formatDate(new Date(item)));
    let result = await getFilteredFeatures(age, gender, convertedDate)
    if(result){
        res.status(200).json({result})
    }
})




module.exports = router
