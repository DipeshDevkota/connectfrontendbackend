import React, { useState, useEffect } from 'react';
import axios from 'axios';
// axios is a popular HTTP client for making requests to APIs. It is widely used in JavaScript and React applications to perform various types of HTTP requests (e.g., GET, POST, PUT, DELETE) to communicate with backend servers.

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/api/products');
    setProducts(response.data);
  };


  const addProduct = async () => {
    // Create a new product object with the current values of name, price, and description
    const newProduct = { name, price, description };
    
    // Send a POST request to the backend API to add the new product
    // The function will wait here until the POST request completes
    await axios.post('http://localhost:5000/api/products', newProduct);
    
    // Fetch the updated list of products to refresh the UI
    // This will get the latest products including the one just added
    fetchProducts();
    
    // Clear the input fields by resetting the state variables
    setName('');
    setPrice('');
    setDescription('');
  };
  
  



  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price} - {product.description}
          </li>
        ))}
      </ul>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default App;
