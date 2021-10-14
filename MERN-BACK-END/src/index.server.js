const express = require('express')
const env= require('dotenv')
const app = express();
// const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const initialDataRoutes = require('./routes/admin/initialData')

const path = require('path')
const cors = require('cors')
env.config();

// monfodb connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.2aekx.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
 {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
    
}).then(()=>{
    console.log("Database connected successfully")
});

//middlewares
app.use(cors())
app.use(express.json());
app.use('/public', express.static(path.join(__dirname,'uploads')))
app.use('/api',authRoutes)
app.use('/api',adminRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',cartRoutes)
app.use('/api',initialDataRoutes);



app.listen(process.env.PORT,()=>{
    console.log(`listening on port : ${process.env.PORT}`)
})