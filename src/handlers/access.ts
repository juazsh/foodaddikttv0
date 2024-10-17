import prisma from '../db'
import { generateJWT } from '../modules/auth'
import { getRandomAccessCode } from '../modules/util'
import { sendMail } from '../services/email'
import { USER_TYPE } from '../modules/shared'

export const handleUserAccessRequest = async (req, res) => {
  try {
    let user = undefined
    const { type, username} = req.body
    if(type === USER_TYPE.CUSTOMER) {
      user = await prisma.customer.findUnique({ where: { username } })
      if(!user) {
        user = await prisma.customer.create({ data: { username } }) 
      }
    } 
    else {
      user = await prisma.owner.findUnique({ where: { username } })
      if(!user)
      {
        user = await prisma.owner.create({ data: { username } }) 
      }
    }
    const code = getRandomAccessCode()
    const accessRequest = await prisma.accessRequest.create({data: { code, username } })
    await sendMail(username, 'Your Access Code', `<html><body><h4>Hi ${username}<h4>
      <p>Use the code below to access your account</p>
      <p style="font-size: 20px; color: blue">${code}</p>
      </body></html>`)
    res.json({data: {username, requestId : accessRequest.id }, message: 'Check your email for access code', success: true})  
  }
  catch(err) {
    console.log(err.message)
    res.json({data: {}, message: 'Something went wrong!', success: false})  
  }
}

export const handleVerifyAccessRequest = async (req, res) => {
  try {
    const { requestId, username, type, code } = req.body
    const accessRequest = await prisma.accessRequest.findUnique({ where: { id: requestId, username, code }})
    if(!accessRequest)
    { 
      throw new Error('Invalid Code! Please try with a different code')
    }
    let user = type === USER_TYPE.CUSTOMER 
      ? await prisma.customer.findUnique({ where: { username } })
      : await prisma.owner.findUnique({ where: { username } })
    const token = generateJWT(user, type)
    await prisma.accessRequest.delete({ where: { id: requestId, username, code }})
    res.json({ data: {token}, message: 'Valid Code! Access Granted', success: true })
  }
  catch(err) {
    res.json({data: {}, message: err.message, success: false})
  }
}