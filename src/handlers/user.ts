import { getRandomAccessCode } from '../modules/util'
import { sendMail } from '../services/email'
import prisma from './../db'

enum USER_TYPE {
  ADMIN,
  OWNER,
  USER
}

export const handleUserAccessRequest = async (req, res) => {
  try {
    let user = undefined
    const { type, username} = req.body
    if(type === USER_TYPE.USER)
    {
      user = await prisma.user.findUnique({ where: { username } })
      if(!user)
      {
        user = await prisma.user.create({ data: { username } }) 
      }
    } else {
      user = await prisma.owner.findUnique({ where: { username } })
      if(!user)
      {
        user = await prisma.owner.create({ data: { username } }) 
      }
    }
    const code = getRandomAccessCode()
    await prisma.accessCode.create({data: { code, username } })
    await sendMail(username, 'Your Access Code', `<html><body><h4>Hi ${username}<h4>
      <p>Use the code below to access your account</p>
      <p style="font-size: 20px; color: blue">${code}</p>
      </body></html>`)
    res.json({data: {}, message: 'Check your email for access code', success: true})  
  }
  catch(err) {
    res.json({data: {}, message: 'Something went wrong!', success: false})  
  }
}

export const handleVerifyAccessRequest = async (req, res) => {
  res.send(req.body)
}