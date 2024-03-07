const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const {RegisterUser, LoginUser} = require('../controller/authController');

router.post("/register", RegisterUser)

router.post('/login', LoginUser)
                
module.exports = router;
