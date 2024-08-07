const express = require('express');
require('dotenv').config()
const axios = require('axios')
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const adminAccountRoute = require('./routes/admin_account');
const adminRoute = require('./routes/admin');
const serviceRoute = require('./routes/service');
const serviceFeeRoute = require('./routes/service_fee');
const vehicleRoute = require('./routes/vehicle');
const customerRoute = require('./routes/customer');
const blogRoute = require('./routes/blog');
const commentBlogRoute = require('./routes/comment_blog');
const itemRoute = require('./routes/item');
const orderRoute = require('./routes/order');
const vnpayRoute = require('./routes/vnpay');
const driverRoute = require('./routes/driver');
const ratingDriverRoute = require('./routes/rating_driver');
const ratingServiceRoute = require('./routes/rating_service');
const driverAccountRoute = require('./routes/driver_account');
const notificationRoute = require('./routes/notification');


var cookieParser = require('cookie-parser')

const http = require('http');

//Socket.io
const { Server } = require('socket.io'); // Add this

//Cors
const cors = require("cors");

//Connect to mongodb Atlas
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI_ATLAS;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectDB = async (url) => {
    try {
        const conn = await mongoose.connect('mongodb+srv://quidev2505:9MwTCoZyCgk0IzWQ@cluster0.x11swix.mongodb.net/movinghouseservice?retryWrites=true&w=majority', connectionParams);
        console.log(`Connect Successful - MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const app = express()

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))

const server = http.createServer(app);

//API - Routes
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

//Admin Account Route
app.use("/v1/adminAccount", adminAccountRoute);

//Admin Route
app.use("/v1/admin", adminRoute);


//Service Route
app.use("/v1/service", serviceRoute);

//Service Fee Route
app.use("/v1/service_fee", serviceFeeRoute);

//Vehicle
app.use("/v1/vehicle", vehicleRoute);

//User Manager
app.use("/v1/customer", customerRoute)

//Blog 
app.use("/v1/blog", blogRoute)

//Comment Blog 
app.use("/v1/commentBlog", commentBlogRoute)

//Item 
app.use("/v1/item", itemRoute)

//Order 
app.use("/v1/order", orderRoute)

//Driver
app.use("/v1/driver", driverRoute)

//Driver
app.use("/v1/ratingDriver", ratingDriverRoute)

//Driver Account
app.use("/v1/driverAccount", driverAccountRoute)

//Rating Service
app.use("/v1/ratingService", ratingServiceRoute)

//Quản lí thông báo khi có đơn hàng mới !
app.use("/v1/notification", notificationRoute)

//Thanh toán với VN PAY
app.use("/v1/vnpay", vnpayRoute)

//Middleware Test First
app.get('/', (req, res) => {
    res.send('ok')
})

const PORT = 5000 || process.env.PORT

//Awake server
setInterval(() => {
  const awakeServer = async () => {
    try{
        const res = await axios.get('https://chemical-malleable-scraper.glitch.me/')
        console.log(res.data)
    }catch(e){
      console.log(e)
    }
  }
  awakeServer()
}, 3*60*1000)


//Connect first before running server
connectDB().then(() => {
  try{
     server.listen(PORT, () => 'Server is running on port 5000');
  }catch(e){
    console.log(`Connect Error`+ e)
  }
}).catch((e) => {console.log(`E: ${e}`)})

