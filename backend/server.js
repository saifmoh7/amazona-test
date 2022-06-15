const express = require("express")
const data = require("./data");

const app = express()
const port = 5000;

app.get('/', (req, res) => {
    res.send("server is ready")
})

app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`)
})