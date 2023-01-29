const path = require('path')
const { StatusCodes } = require('http-status-codes')

const NotFoundMiddleware = async (req, res, next) => {
  return res.status(StatusCodes.NOT_FOUND).sendFile(path.resolve(__dirname, '../../client/build/index.html'))
}

module.exports = NotFoundMiddleware
