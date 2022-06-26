const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

// const data = require("./data");
const userRouter = require("./routers/userRouter.js");
const productRouter = require("./routers/productRouter.js");

dotenv.config();

const app = express()
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost/amazona', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(() => {
console.log('connected to mongoDB');
}).catch((error) => {
    console.log(error.reason);
});

app.use(cors());

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.get('/', (req, res) => {
    res.send("server is ready")
})


app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})

app.listen(port, () => {
    console.log(`Server at http://loctalhost:${port}`)
})






// app.get('/api/products', (req, res) => {
//     res.send(data.products)
// })

// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find((x) => x._id === req.params.id);
//     if (product) {
//         res.send(product)
//     } else {
//         res.status(404).send({message: "Product Not Found!"});
//     }
// })