export interface IProduct {
  name: string
  brand: string
  price: number
  category: string
  description?: string | null
  quantity: number
  inStock: boolean
}
