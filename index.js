const express = require("express")
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const routes = require("./routes")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const morgan = require("morgan")
dotenv.config();

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use(morgan("common"))
routes(app)
const productRoutes = require('./routes/ProductRouter')
app.use(`/api/product`,productRoutes)

//CONNECT TO DATABASE
mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(()=>{
        console.log("Connect database success!")
    })
    .catch((err)=>{
        console.log(err)
    })

// const productSchema = new mongoose.Schema({
//     name: String,
//     color: String,
//     price: Number,
//     size: String,
// });
// module.exports = mongoose.model('')
// const Product = mongoose.model('Product', productSchema);
//     app.post('/api/products', async (req, res) => {
//         try {
//             const { name, color, price, size } = req.body;
//             const product = new Product({ name, color, price, size });
//             await product.save();
//             res.status(201).json(product);
//         } catch (error) {
//             res.status(400).json({ error: 'Error creating product' });
//         }
//     });
    
//     app.get('/api/products', async (req, res) => {
//         try {
//             const products = await Product.find();
//             res.status(200).json(products);
//         } catch (error) {
//             res.status(400).json({ error: 'Error fetching products' });
//         }
//     });
// RUN SEVER
app.listen(port,()=>{
    console.log("Server is running in port: " + port)
})
