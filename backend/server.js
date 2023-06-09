import express from 'express'; 
import path from 'path';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import importData from './seeder.js'

dotenv.config()

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Lesson 37 - Adding this to be able to accept JSON data in the body from Postman - This is for user authentication
app.use(express.json());


//Lesson 11 - We added express and the backend folder and we added the start script in the root package.json file so we can use $npm start from the cmd terminal



app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))




const __dirname = path.resolve() //unable to use __dirname here so need to create this constant
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) //We are making the folder static

//The following if statement is to use the route to the static build folder
if(process.env.NODE_ENV = 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    });
}





//Lesson 22 - set up the routes  and moved the calls to product-router.js
// app.get('/api/products', (req, res) => {
//     res.json(products)
// });

// app.get('/api/products/:id', (req, res) => {
//     const product = products.find((p) => p._id === req.params.id)
//     res.json(product)
// });

//Lesson 24: Creating middleware that will handle the errors in the get requests - moved the code to the middleware errorMiddleware.js file

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
// importData()