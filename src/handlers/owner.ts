import { Request, Response } from 'express'
import { USER_TYPE } from '../modules/shared'
import prisma from '../db'

export const handleOwnerInfoUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.user
 
    await prisma.owner.update({where : {id}, data: {...req.body}})

    res.json({data: {}, message: "Owner's info updated successfully", success: true })
  }
  catch(err) {
    res.json({data: {}, message: err.message, success: false})
  }
}

export const handleGetOwners = async (req: Request, res: Response) => {
  try {
    const owners =  await prisma.owner.findMany()
    res.json({data: { owners }, message: 'Retrieved Successfully', success: true})
  }
  catch(err) {
    res.json({data: {}, message: err.message, success: false})
  }
}