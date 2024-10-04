require('dotenv').config();

const express=require('express');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const userRoutes=require('./Routes/userRoutes');
const cors=require('cors');
const movieRoutes = require('./Routes/movieRoutes');
const theatreRoutes=require('./Routes/theatreRoutes');
const showRoutes = require('./Routes/showRoutes')
const bookingRoutes = require('./Routes/bookRoutes');
const helmet = require("helmet");
const mongoSanitize=require("express-mongo-sanitize");
const path=require('path');

const app=express();
app.use(cors());
const PORT=8080;

app.use(express.static(path.join(__dirname,"build")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"build","index.html"));
})

app.use(helmet());

app.use(mongoSanitize());

//app.disable("x-powered-by");

// app.use(helmet.configureSecurityPolicy({
//   directives:{
//     defaultSrc:["'self'"],
//     scriptSrc:["'self'","example.com"],
//     styleSrc:["'self'","'unsafe-inline'"],
//     imgSrc:["'self'","data:","example.com"],
//     connectSrc:["'self'","api.example.com"],
//     fontSrc:["'self'","fonts.googleapis.com"],
//     frameSrc:["'self'","example.com"],
//     objectSrc:["'none'"],
//     upgradeInsecureRequests:[]
//   }
// }))

const apiLimiter = rateLimit({
  windowMs:15*60*1000,
  max:100,
  message:"Too many request from this id"
})

app.use('/api/',apiLimiter);


app.use(express.json());
app.use('/api/users',userRoutes);
app.use('/api/movies',movieRoutes);
app.use('/api/theatres',theatreRoutes);
app.use('/api/show',showRoutes);
app.use('/api/booking',bookingRoutes)

connectDB(process.env.DB_URL);

app.listen(PORT,()=>{
  console.log( `Server is running on port ${PORT}`);
})