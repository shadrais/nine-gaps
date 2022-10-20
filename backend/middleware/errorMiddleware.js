const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red)
  console.log(res.statusCode)
  res.status(res.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = errorHandler
