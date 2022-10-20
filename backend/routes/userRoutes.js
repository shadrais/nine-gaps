const express = require('express')
const router = express.Router()
const path = require('path')
const protect = require('../middleware/authMiddleware')

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controller/userController')
const multer = require('multer')

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb('Please upload only images.', false)
  }
}

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(path.join(__dirname, '../', 'uploads/'))
    cb(null, path.join(__dirname, '../', 'uploads/'))
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_profile_image.png`)
  },
})

const upload = multer({ storage: storage, fileFilter: imageFilter })

router.post('/signup', upload.single('profilePicture'), registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUserProfile)
router.post('/update', protect, updateUserProfile)

module.exports = router
