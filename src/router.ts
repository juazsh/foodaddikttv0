
import { Router } from 'express'
import { handleOwnerInfoUpdate, handleGetOwners } from './handlers/owner'
import { handleAddMenuItemReview, handleAddStoreReview, handleDeleteMenuItemReview, handleDeleteStoreReview, handleGetMenu, handleGetOneMenuItem, handleGetOneStore, handleGetStores, handleGetStoresWithFilters, handleMenuItemCreation, handleMenuItemUpdate, handleStoreCreation, handleStoreUpdate, handleUpdateMenuItemReview, handleUpdateStoreReview } from './handlers/store'
import { handleGetOrdersForCustomer, handleGetOrdersForStore, handleOrderCreation, handleOrderUpdate } from './handlers/order'
const router = Router()

router.put('/owners', handleOwnerInfoUpdate)
router.get('/owners', handleGetOwners)

router.post('/stores', handleStoreCreation)
router.put('/stores/:storeId', handleStoreUpdate)
router.get('/stores', handleGetStores)
router.get('/stores/:storeId', handleGetOneStore)
router.get('/stores/nearby', handleGetStoresWithFilters)
router.post('/stores/:storeId/menu', handleMenuItemCreation)
router.post('/stores/:storeId/menu/:mid', handleMenuItemUpdate)
router.post('/stores/menu/:mid/review', handleAddMenuItemReview)
router.put('/stores/menu/:mid/review', handleUpdateMenuItemReview)
router.delete('/stores/menu/:mid/review', handleDeleteMenuItemReview)

router.post('/stores/:storeId/menuitems/:mid', handleGetOneMenuItem)
router.get('/stores/:storeId/menuitems', handleGetMenu)
router.post('/stores/:storeId/review', handleAddStoreReview)
router.put('/stores/:storeId/review', handleUpdateStoreReview)
router.delete('/stores/:storeId/review', handleDeleteStoreReview)

router.post('/orders/:storeId/:customerId', handleOrderCreation)
router.put('/orders/:orderId', handleOrderUpdate)
router.get('/orders/:storeId', handleGetOrdersForStore)
router.get('/orders/:customerId', handleGetOrdersForCustomer)


router.post('/orders')
export default router