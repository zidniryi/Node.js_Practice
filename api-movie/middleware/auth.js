const jwt = require('jsonwebtoken')
const config = require('config')
module.exports =  function (req, res, next) {
  // Middelware to verfiy jwt token on the header
  const token = res.header('x-auth-token')
  if (!token) return res.status(401).send('Acces denied, no token provided')

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey')) 
    req.user = decoded
    next()
        } catch (error) {
            res.status(401).send('Invalid token.')      
        }
}
