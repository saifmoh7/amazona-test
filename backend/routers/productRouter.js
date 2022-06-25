const express = require("express")
const expressAsyncHandler = require("express-async-handler")
const Product = require('../models/productModel.js');
const data = require('../data.js');

const productRouter = express.Router()

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
        await Product.remove({});
        const createdProducts = await Product.insertMany(data.products)
        res.send({createdProducts})
}))

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
        if( Array.isArray(products) && products.every(product=>typeof product === 'object') ){
            res.json({ status:200 , products})
        } else {
            res.json({ status:403 })
        }
    } catch (error) {
        res.json({ status:403 })
    }
}))

productRouter.get('/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        console.log(product)
        if (product) {
            res.json(product)
        } else {
            res.status(404).send({message: "Product Not Found!"});
        }
    } catch (error) {
        res.json({ status:403 })
        console.log(error.message)
    }
})


module.exports = productRouter;