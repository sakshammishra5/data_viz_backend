const jwt = require('jsonwebtoken');
function verifyToken(req, res) {
    try {
        const token = req.header('Authorization').split('Bearer ')[1];
        console.log(token)
        if (!token) return res.status(500).json({ error: 'Access denied' });
        const decoded = jwt.verify(token, 'saksham');
        req.userId = decoded.userId;
        req.username = decoded.username;
        res.status(200).json({ message: 'Token verified', isAuth: true, userId: req.userId,username:req.username });
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: error, isAuth: false });
    }
};

module.exports = verifyToken;