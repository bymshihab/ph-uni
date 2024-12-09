import { Schema } from 'mongoose'

const userSchema = new Schema({
  id: { type: String, required: true },
  password: { type: String, required: true },
  needsPasswordChange: { type: Boolean, default: true },
  role: { type: String, required: true },
  status: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
})
