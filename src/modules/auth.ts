
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const varifyPassword = (password, hashedPassed) => bcrypt.compare(password, hashedPassed)

export const hashPassword = (password) => bcrypt.hash(password, 8)

export const generateJWT = (usr) => {
  const token = jwt.sign({
    id: usr.id, username: usr.username
  })
  return token
} 

export const guard = (req, res, next) => {
  const bearer = req.headers.authorization;
  if(!bearer){
    setUnAuthRespones(res)
    return
  }
  const [, token] = bearer.split(" ")
  if(!token){
    setUnAuthRespones(res)
    return
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  }
  catch(err){
    setUnAuthRespones(res)
    return
  }
}

export const getIP = (req) => {
  let ip = req.headers['x-forwareded-for'] || req.connection.remoteAddress
  ip = ip.replaceAll('::', '')
  ip = ip.replaceAll(':', '')
  ip = ip.replaceAll('ffff', '') // saw this on dev
  const [realIP, ] = ip.split(',')
  return realIP
}
const setUnAuthRespones = (res) => res.status(401).json({message : 'Not Authorized'})