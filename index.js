let express = require('express');
let mongoose = require('mongoose');
let { config } = require('dotenv');
let User = require('./models/user');
let cors = require('cors');
let Product = require('./models/product');
const cart = require('./routes/cart');
const register = require('./controllers/register');
const login = require('./controllers/login');
const admin = require('./routes/admin');
const { resolve } = require('path');
const products = require('./routes/product');
// Enable .env file access
config();

// Connect to database
mongoose
	.connect(
		`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.d7fyatk.mongodb.net/?retryWrites=true&w=majority`
	)
	.then(() => {
		console.log('Connected to database successfully!');

		// Initialize express
		let app = express();

		// Allow cross origin access
		app.use(cors());

		// Enable url encoded paths
		app.use(express.urlencoded({ extended: true }));

		// Enable json body
		app.use(express.json());

		// Static route
		app.use(express.static(resolve(__dirname, './view')));

		// Route handler for cart
		app.use('/api/cart', cart);

		// Admin routes
		app.use('/api/admin', admin);

		// Products route
		app.use('/api/products', products);

		// Handle user registration
		app.post('/api/register', register);

		// Handle user Login
		app.post('/api/login', login);

		// Set the port
		let port = process.env.PORT || 8000;

		app.listen(port, () => console.log(`App is listening on port ${port}`));
	})
	.catch((error) => {
		throw new Error('Failed to connect to database');
	});
