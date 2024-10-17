import { Request, Response } from 'express'
import prisma from '../db'

export const handleOrderCreation = async (req: Request, res: Response) => {
  try {
    const { customerId, storeId } = req.params
    const order = await prisma.order.create({data: { customerId, storeId ,...req.body}})
    res.json({data: { order }, message: "Order created successfully", success: true })
  } 
  catch(err){
    res.json({data: {}, message: 'Something went wrong!', success: false})
  }
}
export const handleOrderUpdate = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params
    const order = await prisma.order.update({ where: { id: orderId }, data: {...req.body}})
    res.json({data: { order }, message: "Order updated successfully", success: true })
  } 
  catch(err){
    res.json({data: {}, message: 'Something went wrong!', success: false})
  }
}

export const handleGetOrdersForCustomer = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.param
    const orders = await prisma.order.findMany({where: { customerId }})
    res.json({ data: {orders }, message: "Retrieved Successfully", success: true })
  } 
  catch(err){
    res.json({data: {}, message: 'Something went wrong!', success: false})
  }
}

export const handleGetOrdersForStore = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.param
    const orders = await prisma.order.findMany({where: { storeId }})
    res.json({ data: {orders }, message: "Retrieved Successfully", success: true })
  } 
  catch(err){
    res.json({data: {}, message: 'Something went wrong!', success: false})
  }

}