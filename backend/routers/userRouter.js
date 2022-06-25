const express = require("express")
const expressAsyncHandler = require("express-async-handler")
const User = require('../models/userModel.js');
const data = require('../data.js');

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
        await User.remove({});
        const createdUsers = await User.insertMany(data.users)
        res.send({createdUsers})
    }
))

userRouter.get('/', expressAsyncHandler(async (req, res) => {
    const users = await User.find({})
    res.send({users})
}
))
module.exports = userRouter; 

