import { Request, Response } from 'express'
import prisma from '../db'
import { Category } from '@prisma/client'
export const handleStoreCreation = async (req: Request, res: Response) => {
  try {
    const { id } = req.user
    const {latitude, longitude } = req.body
    const store = await prisma.store.create({ data: {
      belongsToId: id,
      location: { type: 'Point', coordinates: [latitude, longitude]},
      ...req.body
    }})
    res.json({data: { store }, message: "New store added successfully", success: true })
  }
  catch(err) {
    res.json({data: {}, message: err.message, success: false})
  }
}

export const handleStoreUpdate = async (req: Request, res: Response) => {
  try {
    const { storeId } = req.params
    const store = await prisma.store.update({where : {id : storeId }, data: { ...req.body}})
    res.json({data: { store }, message: "Store updated successfully", success: true })
  }
  catch(err) {
    res.json({data: {}, message: err.message, success: false})
  }
}

export const handleGetStores = async (req: Request, res: Response) => {
  try {
    const stores =  await prisma.store.findMany()
    res.json({data: { stores }, message: 'Retrieved Successfully', success: true})
  }
  catch(err) {
    res.json({data: {}, message: err.message, success: false})
  }
}
// experimental
export const handleGetStoresWithFilters = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, distance } = req.body
    const radiusInRadians = distance / 6371
    
    const nearbyStores =  await  prisma.$runCommandRaw({
      find: 'Store',
      filter: {
        location: {
          $geoWithin: {
            $centerSphere: [[parseFloat(longitude), parseFloat(latitude), radiusInRadians]]
          }
        }
      }
    })
    res.json({data: { stores: nearbyStores }, message: 'Retrieved Successfully', success: true})
  }
  catch(err) {
    res.json({data: {}, message: err.message, success: false})
  }
}


/** menu item handlers */
export const handleMenuItemCreation = async (req: Request, res: Response) => {
  try {
    const { storeId } =  req.params
    const menuItem =  await prisma.menuItem.create({data: {
      ofStoreId: storeId,
      ...req.body
    }})
    res.json({data: { menuItem }, message: 'Menu item added successfully!', success: true})
  }
  catch(err) {
    res.json({data: {}, message: err.message, success: false})
  }
}

export const handleMenuItemUpdate = async (req: Request, res: Response) => {
  try {
    const { mid } = req.params
    const menuItem = await prisma.menuItem.update({where : {id : mid }, data: { ...req.body }})
    res.json({data: { menuItem }, message: "Menuitem updated successfully", success: true })
  }
  catch(err) {
    res.json({data: {}, message: err.message, success: false})
  }
}

export const handleGetOneMenuItem = async (req: Request, res: Response) => {
  try {
    const {mid} = req.params
    const menuItem =  await prisma.menuItem.findUnique({where: {id: mid}})
    res.json({data: { menuItem }, message: 'Retrieved Successfully', success: true})
  }
  catch(err) {
    res.json({data: {}, message: err.message, success: false})
  }
}

export const handleGetMenu = async (req: Request, res: Response) => {
  try {
    const { storeId } =  req.params
    const menu =  await prisma.menuItem.findMany({where: { ofStoreId: storeId }})
    res.json({data: { menu }, message: 'Retrieved Successfully', success: true})
  }
  catch(err) {
    res.json({data: {}, message: err.message, success: false})
  }
}

