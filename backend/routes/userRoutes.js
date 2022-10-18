const express = require('express')
const router = express.Router()
const path = require('path')
const protect = require('../middleware/authMiddleware')

const {
  registerUser,
  loginUser,
  getUserProfile,
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
    cb(null, path.join(__dirname, '../', 'uploads/'))
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-profile-${file.originalname}`)
  },
})

const upload = multer({ storage: storage, fileFilter: imageFilter })

router.post('/signup', upload.single('profilePicture'), registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUserProfile)

module.exports = router
