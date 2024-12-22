const express = require('express')
const Filter = require('../model/filter')
const router = express.Router()

router.post("/setFilter", async (req, res) => {
    const { userId, filters } = req.body
    // console.log("upcoming_filters",filters)
    let filter = await Filter.findOne({ userId })
    if (filter == null) {
        filter = await Filter.create({ userId, filter: { Age: filters.age, Gender: filters.gender, DateRange: filters.dateRange } })
    }
    else {
        filter = await Filter.findOneAndUpdate({ userId }, { filter: { Age: filters.age, Gender: filters.gender, DateRange: filters.dateRange } })
    }
    res.cookie("filters", JSON.stringify(filter), {
        httpOnly: false,
    })
    return res.status(200).json({ success: true, filter })
})


module.exports = router