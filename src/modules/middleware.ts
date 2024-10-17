import { USER_TYPE } from "./shared"
import { getIP } from "./util"


export const logIncomingRequest = (req, res, next) => {
  console.log('IP:', getIP(req))
  console.log('Original Url: ', req.originalUrl)
  console.log('Body: ', req.body)
  next()
}

export const allowOnlyOwner = (req, res, next) => {
  const { type } = req
  if(type !== USER_TYPE.OWNER)
  {
    res.status(401)
    res.json({data: {}, message: 'Unauthorized', success: false})
  }
  next()
}
