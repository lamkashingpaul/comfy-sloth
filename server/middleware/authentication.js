const { auth } = require('express-oauth2-jwt-bearer')

const authenticationMiddleware = auth({
  audience: `${process.env.API_ENDPOINT}`,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`
})

module.exports = authenticationMiddleware
