const express = require('express');
const router = express.Router();
const logoutContreoller = require('../controllers/logoutContreoller');

router.get('/', logoutContreoller.handleLogout);

module.exports = router;