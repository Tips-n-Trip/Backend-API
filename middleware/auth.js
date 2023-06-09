const jwt = require('jsonwebtoken');

module.exports.generateToken = (id) => {
  return jwt.sign({id},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: 1000*60*60*24*14});
};

module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.get('authorization');
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
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, token) => {
    if (error) {
      return res.status(403).json({
        'success': false,
        'message': 'Invalid JWT Token',
      });
    };
    req.token = token;
    next();
  });
};
