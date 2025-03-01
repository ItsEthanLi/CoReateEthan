const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModels');
const { createUser, getUser, updateUser } = require('../controllers/userControllers');

router.post("/create", createUser);
router.get("/getuser", getUser);
router.patch("/updateuser", updateUser);

module.exports = router;