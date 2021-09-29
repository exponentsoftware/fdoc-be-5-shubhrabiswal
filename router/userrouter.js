const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/usercontroller')

router.post('/',usercontroller.adduser)
router.get('/:id', usercontroller.getalltodo);
router.get('/',usercontroller.registereduser)

module.exports = router;