const Analytics = require("../model/feature");

 const analyticsController = {
  // Get aggregated feature data with filters
  async getAggregatedFeatures(req, res) {
    try {
        console.log(req.query)
      const { startDate, endDate, age, gender } = req.query;
      
      // Build match conditions based on filters
      const matchConditions = {};
      
      if (startDate && endDate) {
        matchConditions.Day = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }
      
      if (age && age !== 'all') {
        matchConditions.Age = age;
      }
      
      if (gender && gender !== 'all') {
        matchConditions.Gender = gender;
      }

      const aggregationPipeline = [
        { $match: matchConditions },
        {
          $group: {
            _id: null,
            A: { $sum: '$A' },
            B: { $sum: '$B' },
            C: { $sum: '$C' },
            D: { $sum: '$D' },
            E: { $sum: '$E' },
            F: { $sum: '$F' }
          }
        }
      ];

      const result = await Analytics.aggregate(aggregationPipeline);
      
      // Transform the result into the expected format
      const transformedData = result.length > 0 ? 
        Object.entries(result[0])
          .filter(([key]) => key !== '_id')
          .map(([feature, value]) => ({ feature, value }))
        : [];

      res.json(transformedData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get time series data for a specific feature with filters
  async getFeatureTimeSeries(req, res) {
    try {
      const { feature, startDate, endDate, age, gender } = req.query;
      
      // Build match conditions based on filters
      const matchConditions = {};
      
      if (startDate && endDate) {
        matchConditions.Day = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }
      
      if (age && age !== 'all') {
        matchConditions.Age = age;
      }
      
      if (gender && gender !== 'all') {
        matchConditions.Gender = gender;
      }

      const aggregationPipeline = [
        { $match: matchConditions },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$Day' } },
            value: { $sum: `$${feature}` }
          }
        },
        { $sort: { '_id': 1 } },
        {
          $project: {
            date: '$_id',
            value: 1,
            _id: 0
          }
        }
      ];

      const result = await Analytics.aggregate(aggregationPipeline);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports=analyticsController