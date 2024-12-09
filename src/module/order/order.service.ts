import Order from './order.model'
import { IOrder } from './order.interface'
import Product from '../product/product.model'

const createOrder = async (order: IOrder) => {
  const { product, quantity } = order

  const productInDb = await Product.findById(product)
  if (!productInDb) {
    throw new Error('Product not found')
  }

  // check if the product is available
  if (productInDb.quantity < quantity) {
    throw new Error('Product out of stock')
  }
  // creae new order
  const newOrder = new Order(order)
  //update the product quantity
  productInDb.quantity -= quantity

  //if the product quantity is 0, set inStock to false
  if (productInDb.quantity === 0) {
    productInDb.inStock = false
  }

  const result = await Order.create(order)
  return result
}

const getOrder = async () => {
  const result = await Order.find()
  return result
}

const getTotalRevenue = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ])
  return result
}

export default {
  createOrder,
  getOrder,
  getTotalRevenue,
}
