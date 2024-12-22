const Feature = require("../model/feature")


async function getFilteredFeatures(req, res) {
    const { gender, age, dateRange } = req.body
    if (!gender || !age || !dateRange) {
        throw new Error('Missing required parameters');
    }

    try {
        const pipeline = [
            {
                $match: {
                    $or: [{ Day: { $gte: dateRange[0] } }, { Day: { $lte: dateRange[1] } }]
                },

            },
            { $match: { Age: { $eq: age } } },

            { $match: { $or: [{ Gender: { $eq: gender } }, { Gender: { $eq: "Female" } }]}},

            {
                $project: {
                    Day: 1,
                    Gender: 1,
                    Age: 1,
                    feature: {
                        A: "$A",
                        B: "$B",
                        C: "$C",
                        D: "$D",
                        E: "$E",
                        F: "$F",
                    }
                }
            }
        ];

        const data = await Feature.aggregate(pipeline)
        const result = data.map((item) => [
            { name: "A", value: item.feature.A, Gender: item.Gender, Age: item.Age, Day: item.Day },
            { name: "B", value: item.feature.B, Gender: item.Gender, Age: item.Age, Day: item.Day },
            { name: "C", value: item.feature.C, Gender: item.Gender, Age: item.Age, Day: item.Day },
            { name: "D", value: item.feature.D, Gender: item.Gender, Age: item.Age, Day: item.Day },
            { name: "E", value: item.feature.E, Gender: item.Gender, Age: item.Age, Day: item.Day },
            { name: "F", value: item.feature.F, Gender: item.Gender, Age: item.Age, Day: item.Day },
        ]).flat().slice(0, 5);
        // console.log(result)
        return res.status(200).json({ result })

    } catch (error) {
        console.error('Error in getFilteredFeatures:', error);
        throw error;
    }
}

module.exports = { getFilteredFeatures }








