const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
// When a client sends a JSON 
// payload in the body of a request 
// (such as a POST or PUT request),
// the bodyParser.json()
//  middleware parses 
//  this JSON payload and converts
//  it into a JavaScript object. 
// Middleware
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Product = mongoose.model('Product', productSchema);
//for adding new product
app.post('/products', async (req, res) => {
    const { name, price, description } = req.body;
  
    const newProduct = new Product({ name, price, description });
  
    try {
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct); // Return the saved product with a 201 status code
    } catch (error) {
      console.error('Error saving product:', error);
      res.status(500).json({ message: 'Failed to save product', error });
    }
  });



app.get('/api/products',async(req,res)=>{
    const product = await Product.find();
    res.json(product);
})

const PORT=5000;
app.listen(5000,()=>{
    console.log("Server running on port "+ PORT);
})