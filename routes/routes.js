const express = require('express')
const router = express.Router()

const upload = require('../config/multer')

const bookController = require('../controller/BookController')
const userController = require('../controller/userController')

router.post(
  '/send',
  upload.single('file'),
  userController.verify,
  bookController.create
)
router.get('/see', userController.verify, bookController.getBooks)
router.post('/createUser', upload.single('file'), userController.create)
router.post('/login', userController.validateUser)
module.exports = router
