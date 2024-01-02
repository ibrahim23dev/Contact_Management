const router = require('express').Router()
const { AuthMiddleware } = require('../Middleware/AuthMiddleware')
const AuthController = require('../Controller/AuthController')

router.post('/login', AuthMiddleware, AuthController.UserLogin);
router.get('/registation', AuthMiddleware, AuthController.UserRegister);

module.exports = router