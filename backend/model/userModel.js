const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your last name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Users', userSchema)
