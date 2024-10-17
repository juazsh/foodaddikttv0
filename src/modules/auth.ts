/**  not in use | we will get all these in a library / npm package
import bcrypt from 'bcrypt'
export const varifyPassword = (password, hashedPassed) => bcrypt.compare(password, hashedPassed)
export const hashPassword = (password) => bcrypt.hash(password, 8)
 */

import jwt from 'jsonwebtoken'
import config from '../config'

export const generateJWT = (usr, type) => {
  const token = jwt.sign( {id: usr.id, username: usr.username, type}, config.secrets.jwt )
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
    const user = jwt.verify(token, config.secrets.jwt)
    req.user = user
    next()
  }
  catch(err){
    setUnAuthRespones(res)
    return
  }
}
const setUnAuthRespones = (res) => res.status(401).json({message : 'Not Authorized'})