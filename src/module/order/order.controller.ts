import { Request, Response } from 'express'
import orderService from './order.service'
import { handleValidationError } from '../../utils/errorHandler'
const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const result = await orderService.createOrder(payload)
    res.json({
      status: true,
      message: 'Order created successfully',
      data: result,
    })
  } catch (err: any) {
    // Use the custom validation error handler
    const errorResponse = handleValidationError(err)
    // Return the error response to the client
    res.status(errorResponse.statusCode).json(errorResponse)
  }
}
const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getOrder()
    res.json({
      status: true,
      message: 'Order fetched successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
    res.json({
      status: false,
      message: 'Internal Server Error',
    })
  }
}

const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getTotalRevenue()
    res.json({
      status: true,
      message: 'Total revenue fetched successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
    res.json({
      status: false,
      message: 'Internal Server Error',
    })
  }
}

export const orderController = {
  createOrder,
  getOrder,
  getTotalRevenue,
}
