
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Lỗi không xác định';

  res.status(statusCode).json({
    status: 'ERR',
    message,
  });
};

module.exports = errorHandler;
