const router = require('express').Router()
const { AuthMiddleware } = require('../Middleware/AuthMiddleware');
const ContactController = require('../Controller/ContactController');

router.post('/addContact', AuthMiddleware, ContactController.add_Contact);
router.get('/getContact', AuthMiddleware, ContactController.contact_get);

module.exports = router