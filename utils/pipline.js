const Feature = require("../model/feature")
async function getFilteredFeatures(gender, age, dateRange) {
    try {
        const pipeline = [
            { $match: { Gender:'Male',Age:'15-25', $or: [{ Day: { $gte: dateRange[0] } }, { Day: { $lte: dateRange[1] } }] } },
            {
                $project: {
                  Day: 1,
                  Gender: 1,
                  Age: 1,
                  A: 1,
                  B: 1,
                  C: 1,
                  D: 1,
                  E: 1,
                  F: 1
                }
              }
        ];

        const result = await Feature.aggregate(pipeline)
        return result;

    } catch (error) {
        console.error('Error in getFilteredFeatures:', error);
        throw error;
    }
}

module.exports = { getFilteredFeatures }