const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the CORS package



const app = express();



// Enable CORS for all routes
app.use(cors());  // This will allow all domains to access the API

// Middleware to parse JSON and serve static files
app.use(bodyParser.json());
app.use(express.static('Flowers'));  // Assuming your static files are in the 'Flowers' folder

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sudeep@9828',
    database: 'flowers_db'
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Routes
// Fetch all products
app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});
app.get('/api/orders', (req, res) => {
    const sql = 'SELECT * FROM orders';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});
app.get('/api/products/:productKey', (req, res) => {
    const productKey = req.params.productKey;
    db.query('SELECT * FROM products WHERE name = ?', [productKey], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(results[0]);
    });
});


app.post('/api/orders', (req, res) => {
    const { product, name, address, phone } = req.body;

    // Save the order details in the database
    const order = {
        product_name: product.name,
        product_price: product.price,
        product_image: product.image_url,
        user_name: name,
        user_address: address,
        user_phone: phone,
    };

    db.query('INSERT INTO orders SET ?', order, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to place the order' });
        }
        res.status(200).json({ message: 'Order placed successfully', orderId: result.insertId });
    });
});






// Start server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
