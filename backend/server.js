const express = require("express")
const cors = require("cors")

const data = require("./data");

const app = express()
const port = 5000;

app.use(cors());

app.get('/', (req, res) => {
    res.send("server is ready")
})

app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({message: "Product Not Found!"});
    }
})

app.listen(port, () => {
    console.log(`Server at http://loctalhost:${port}`)
})