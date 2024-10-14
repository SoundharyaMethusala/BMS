const authMiddleware = require('../middlewares/authMiddleware');
const bookingModel = require('../models/bookingModel');
const showModel = require('../models/showModel');
const emailHelper = require('../utils/emailHelper');
const stripe = require('stripe')("sk_test_51Q5KVeKcYFgOfsFYCmbfJ5HJ6hndUDVAxq4cZkt1aPMov1gBtVtXy9zv97boWVpp6nq1vB2l9qrTbRZfoHIwQPtY007pbudtfF")
const router = require('express').Router();

router.post('/make-payment',authMiddleware,async (req,res)=>{
    try{
        const {token,amount} = req.body;
        const customer = await stripe.customers.create({
            email:token.email,
            source:token.id
        })
        const paymentIntent = await stripe.paymentIntents.create({
            amount:amount,
            currency:"usd",
            customer:customer.id,
            payment_method_types:["card"],
            receipt_email:token.email,
            description:"Toke has been assigned to movie!!"
        })
        const transactionId=paymentIntent.id;
        res.send({
            success:true,
            message:"Payment Successful!!",
            data:transactionId
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
})

router.post('/book-show',authMiddleware,async (req,res)=>{
    try{
        const newBooking = await bookingModel(req.body);
        await newBooking.save();
       // console.log("newbooking saved",newBooking);
        const show=await showModel.findById(req.body.show).populate('movie');
        const updatedBookedSeats = [...show.bookedSeats,...req.body.seats];
        show.bookedSeats = updatedBookedSeats;
        await show.save();
        const populateBooking = await bookingModel
            .findById(newBooking._id)
            .populate("user")
            .populate("show")
            .populate({
                path:'show',
                populate:{
                    path:'movie',
                    model:'movies'
                },
            })
            .populate({
                    path:'show',
                    populate:{
                        path:'theatre',
                        model:'theatres'
                    }
                })

            console.log("populateBooking",populateBooking);
            res.send({
            success:true,
            message:"Show booked successfully!!",
            data:newBooking
        })
            await emailHelper("ticketTemplate.html",populateBooking.user.email,{
                name:populateBooking.user.name,
                movie:populateBooking.show.movie.movieName,
                theatre:populateBooking.show.theatre.name,
                date:populateBooking.show.date,
                time:populateBooking.show.time,
                seats:populateBooking.seats,
                amount:populateBooking.seats.length*populateBooking.show.ticketPrice,
                transactionId:populateBooking.transactionId
            },"Booking Confirmation!!")
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
})

router.get("/all-booking-by-user",authMiddleware,async (req,res)=>{
    try{
        const bookings = await bookingModel.find({user:req.body.userId})
        .populate('show')
        .populate('user')
        .populate({
            path:"show",
            populate:{
                path:"movie",model:"movies"
            }
        })
        .populate({
            path:'show',
            populate:{
                path:'theatre',
                model:'theatres'
            }
    })
        res.send({
            success:true,
            message:"All bookings by user has been fetched",
            data:bookings
        })
    }
    catch(err){
        res.send({
            success:false,
            message:err.message
        })
    }
})

module.exports=router;