const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware to parse JSON data
app.use(bodyParser.json()); // parse the incoming JSON data in the request body and make it available in request body
app.use(bodyParser.urlencoded({ extended: true })); // it is typically form data sent through HTML forms body

// In-memory database for products
let products = [
    { name: 'product1', price: 1999 },
    { name: 'product2', price: 1999 },
];

// Users for login
const users = [
    { username: 'admin', password: 'admin123' },
];

// Serve static files from 'public' directory
app.use(express.static('public'));

// Route to display the login page
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Route to display list of products (after login)
app.get('/', (req, res) => {
    // Redirect to login if the user is not logged in (this is an example, you can modify it as per your requirement)
    res.send(`
        <h1>Products</h1>
        <ul>
            ${products.map(pro => `<li>Name: ${pro.name}, Price: ${pro.price}</li>`).join('')}
        </ul>
    `);
});

// Login POST handler
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Check if the entered username and password match any user
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Redirect to the products page (or wherever you'd want)
        res.send(
            `<form method="POST" action="/add-product">
            <input type="text" name="name" placeholder="Enter Product name" required>
            <input type="text" name="price" placeholder="Price" required>
            <button type="submit">Add Product</button>`
        )
    } 
    else {
        // Render the login page again with an error message
        res.render('login', { error: 'Invalid username or password' });
    }
});

// Route to add product (admin only)
app.post('/add-product', (req, res) => {
    const { name, price } = req.body;
    products.push({ name, price });
    res.redirect('/');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
