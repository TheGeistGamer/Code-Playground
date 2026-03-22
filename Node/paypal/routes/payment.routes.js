import { PaymentControllers } from '../controllers/payment.controllers.js'
import { Router } from 'express'

export const paymentsRouter = Router()

paymentsRouter.get('/create-order', PaymentControllers.crearOrder)
paymentsRouter.get('/capture-order', PaymentControllers.CaptureOrder)
paymentsRouter.get('/cancel-order', PaymentControllers.CancelOrder)
