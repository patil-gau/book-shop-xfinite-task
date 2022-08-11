const express = require('express');
const router = express.Router();
const { getBooks } = require('../controllers/bookController.js');
const authMiddleWare = require('../middleware/auth.js');


//register all the routes related to books
router.route("/books").get(authMiddleWare,getBooks);

module.exports = router;