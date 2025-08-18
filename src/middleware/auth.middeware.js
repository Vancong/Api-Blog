const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'ERR', message: 'Thiếu token' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
        return res.status(401).json({ status: 'ERR', message: 'Token không hợp lệ' });
    }

    if (!user.isAdmin) {
        return res.status(403).json({ status: 'ERR', message: 'Không có quyền admin' });
    }

    req.user = user;
    next();
  });
};

const authUserMiddleware = (req, res, next) => {
  const userId = req.params.userId;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ status: 'ERR', message: 'Thiếu token' });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
        return res.status(401).json({ status: 'ERR', message: 'Token không hợp lệ' });
    }

    if (user.isAdmin || user._id === userId) {
      req.user = user;
      next();
    } else {
      return res.status(403).json({ status: 'ERR', message: 'Không đủ quyền' });
    }
  });
};

module.exports = {
  authMiddleware,
  authUserMiddleware
};
