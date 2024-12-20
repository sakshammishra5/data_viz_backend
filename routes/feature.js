const express = require("express")
const { format } = require("date-fns")
const router = express.Router()
const Feature = require("../model/feature")
const { getFilteredFeatures } = require("../controllers/feature")
const { formatDate } = require("../utils/formatDate")


router.post("/getChartData",getFilteredFeatures)




module.exports = router
