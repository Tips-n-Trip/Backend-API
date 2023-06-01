const jwt = require('jsonwebtoken');

module.exports.generateToken = (req, res, next) => {
  return jwt.sign(req.id, process.env.ACCESS_TOKEN_SECRET);
};

module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.header['Authorization'];
  if (authHeader === null) {
    return res.status(401).json({
      'success': false,
      'message': 'Missing Authorization header',
    });
  }
  const token = authHeader.split(' ')[1];
  if (token === null) {
    return res.status(401).json({
      'success': false,
      'message': 'Invalid authorization',
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({
        'success': false,
        'message': 'Invalid JWT Token',
      });
    };
    req.user = user;
    next();
  });
};
