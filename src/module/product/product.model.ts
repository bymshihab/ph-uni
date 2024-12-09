import { Schema, model } from 'mongoose'

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a valid product name'],
      minlength: [3, 'Product name must be at least 3 characters long'],
      maxlength: [50, 'Product name must not exceed 50 characters'],
      trim: true, // Removes unnecessary whitespace
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true, // Removes unnecessary whitespace
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
      validate: {
        validator: (value: number) => value < 1000000,
        message: 'Price must not be bigger than 1,000,000',
      },
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: [
          'Writing',
          'Office Supplies',
          'Art Supplies',
          'Educational',
          'Technology',
        ],
        message: '{VALUE} is not valid, please provide a valid category',
      },
    },
    description: {
      type: String,
      maxlength: [500, 'Description must not exceed 500 characters'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a positive number'],
      validate: {
        validator: (value: number): boolean => Number.isInteger(value),
        message: 'Quantity must be an integer',
      },
    },
    inStock: {
      type: Boolean,
      required: [true, 'Stock status is required'],
      default: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
)

//to create a compound index for checking uniqueness of name and brand
productSchema.index(
  { name: 1, brand: 1 }, // Compound fields
  {
    unique: true,
  }
)

// Custom pre-save hook for additional checks (optional)
productSchema.pre('save', function (next) {
  if (this.quantity === 0 && this.inStock === true) {
    return next(new Error('Product cannot be in stock if quantity is zero'))
  }
  next()
})

const Product = model('Product', productSchema)
export default Product
