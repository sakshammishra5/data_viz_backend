const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
const token = req.header('Authorization').split('Bearer ')[1];
if (!token) return res.status(401).json({ error: 'Access denied' });
try {
 const decoded = jwt.verify(token, 'saksham');
 req.userId = decoded.userId;
 res.status(200).json({ message: 'Token verified', userId: req.userId });
 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 };

module.exports = verifyToken;