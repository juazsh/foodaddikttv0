import { getIP } from "./auth"

export const logIncomingRequest = (req, res, next) => {
  console.log('IP:', getIP(req))
  console.log('Original Url: ', req.originalUrl)
  console.log('Body: ', req.body)
  next()
}