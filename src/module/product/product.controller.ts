import { handleValidationError } from '../../utils/errorHandler'
import productService from './product.service'
import { Request, Response } from 'express'

//handelling the request and response for creating a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    // Getting the payload from the request
    const payload = req.body

    // Calling the service function to create the product
    const result = await productService.createProduct(payload)

    // Sending response back to the client
    res.json({
      status: true,
      message: 'Product created successfully',
      data: result, // The newly created product object
    })
  } catch (err: any) {
    console.error(err)

    // Use the custom validation error handler
    const errorResponse = handleValidationError(err)
    // Return the error response to the client
    res.status(errorResponse.statusCode).json(errorResponse)
  }
}

//handelling the request and response for fetching the products with searchTerm
const getProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string // Extract searchTerm from query params
    const result = await productService.getProduct(searchTerm)
    res.json({
      status: true,
      message: 'Products fetched successfully',
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

//get a single product
const getSingleProduct = async (req: Request, res: Response) => {
  //req.params allows us to access the parameters in the url
  const productId = req.params.productId
  try {
    const result = await productService.getSingleProduct(productId)
    res.json({
      status: true,
      message: 'Product fetched successfully',
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

//updating a product
const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params.productId
  const payload = req.body
  try {
    const result = await productService.updateProduct(productId, payload)
    res.json({
      status: true,
      message: 'Product updated successfully',
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
//deleting a product
const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.productId
  try {
    const result = await productService.deleteProduct(productId)
    res.json({
      status: true,
      message: 'Product deleted successfully',
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

export const productController = {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
