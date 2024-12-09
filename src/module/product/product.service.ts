import Product from './product.model'
import { IProduct } from './product.interface'

//creating a new product
const createProduct = async (product: IProduct): Promise<IProduct> => {
  const result = await Product.create(product)
  return result
}

//fetching all the products
const getProduct = async (searchTerm?: string) => {
  const filter: Record<string, any> = {}

  // If searchTerm is provided, create a filter
  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i') // Case-insensitive regex
    filter.$or = [{ category: regex }, { name: regex }, { brand: regex }]
  }

  // Fetch products from the database
  const products = await Product.find(filter)
  return products
}
//fetching a single product
const getSingleProduct = async (id: string) => {
  const result = await Product.findById(id)
  return result
}

//updating a product by id
const updateProduct = async (id: string, product: IProduct) => {
  const result = await Product.findByIdAndUpdate(id, product, { new: true })
  return result
}

//deleting a product by id
const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndDelete(id)
  return result
}

export default {
  createProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
