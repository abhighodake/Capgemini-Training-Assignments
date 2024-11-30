const express = require('express');
const app = express();
const port = 3000;


app.set('view engine', 'pug');


app.use(express.urlencoded({ extended: true }));

const products = [
    {   "name" : "laptop",
        "id" : "1",
        "price" : "40000",
        "category" : "Digital",
        "manufacturingDate" : "2024-06-03",
        "expDate" : "2035-01-30"
    },
    {   "name" : "Mobile",
        "id" : "2",
        "price" : "15000",
        "category" : "Digital",
        "manufacturingDate" : "2024-11-05",
        "expDate" : "2028-06-30"
    }

] 


app.get('/', (req, res) => {
    res.send(`
        <div style="display: flex; flex-direction:column; justify-content: center; align-items: center; height:100vh">
        <h1>Select Your Role</h1>
        <form method="POST" action="/selectUser">
            <button name="role" value="user" type="submit">User</button>
            <button name="role" value="admin" type="submit">Admin</button>
        </form>
        </div>
    `);
});


app.post('/selectUser', (req, res) => {
    const { role } = req.body; 
    if (role === 'user') {
        res.render('user');
    } else if (role === 'admin') {
        res.render('admin'); 
    }
});

app.get('/views/user', (req, res) => {
    res.render('user');
});

app.get('/views/admin', (req, res) => {
    res.render('admin');
});

app.post('/userLogin', (req, res) => {
    const { name, pass } = req.body; // Get the credentials
    if (name === 'user' && pass === 'pass123') {
        res.render('product', { products }); // Render 'product.pug'
    } else {
        res.send('Invalid username or password');
    }
});

app.get('/views/product', (req, res) => {
    res.render('product');
});

app.post('/adminLogin', (req, res) => {
    const { name, pass } = req.body; // Get the credentials
    if (name === 'admin' && pass === 'admin123') {
        res.render('adminDashboard'); // Render 'adminDashboard.pug' or any relevant admin page
    } else {
        res.send('Invalid admin credentials');
    }
});





app.get('/searchProduct', (req, res) => {
    const query = req.query.query || '';  // Get search query from the URL
    
    if (query) {
        // Filter products based on the search query
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        // Render product page with filtered products
        res.render('product', { products: filteredProducts });
    } else {
        // If no query, just render the page with no products
        res.render('product', { products: [] });
    }
});



app.get('/views/product', (req, res) => {
    res.render('product', { products: products });
});


app.post('/addProduct', (req, res) => {
    const { name, price, category, manufacturingDate, expDate } = req.body;


    const newId = products.length + 1;

    const newProduct = {
        name: name,
        id: newId.toString(),
        price: price,
        category: category,
        manufacturingDate: manufacturingDate,
        expDate: expDate
    };

  
    products.push(newProduct);

    res.render('product', { products }); 
});

app.get('/views/product', (req, res) => {
    res.render('product', { products: products });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
