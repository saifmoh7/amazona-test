const express = require("express")
const bcrypt = require("bcrypt")
const expressAsyncHandler = require("express-async-handler")
const User = require('../models/userModel.js');
// const data = require('../data.js');
const generateTokon = require("../utils.js");

const userRouter = express.Router();

// userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
//         await User.remove({});
//         const createdUsers = await User.insertMany(data.users)
//         res.send({createdUsers})
//     }
// ))

userRouter.get('/', expressAsyncHandler(async (req, res) => {
    const users = await User.find({})
    res.send({users})
}
))


userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email})
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateTokon(user)
            });
        return;    
        }
    }else{
        res.status(401).send({message: "Invalid Email or Password"})
    }
}))


module.exports = userRouter; 

