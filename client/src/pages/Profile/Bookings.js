import { useState } from "react"
import {getallBookingByUser} from '../../api/bookings'
import {Row,Col,Button,message,Card} from 'antd'
import {Link} from 'react-router-dom'
import moment from 'moment'
import { useEffect } from "react"

const Bookings = ()=>{
    const [bookings,setBookings] = useState([]);

    const getData = async ()=>{
        try{
            const response = await getallBookingByUser();
            if(response.success){
                setBookings(response.data);
            }
            else{
                message.error(response.message);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getData();
    },[])

    return(
        <>
        {
            bookings && (
                <Row gutter={24}>
                    {bookings.map((booking)=>{
                        return (
                            <Col key={booking._id} xs={{span:24}} lg={{span:12}}>
                                <Card className="mb-3">
                                    <div className="d-flex flex-column-mob">
                                        <div className="flex-shrink-0">
                                            <img src={booking.show.movie.poster}
                                            width={100}
                                            alt="Movie Poster"/>
                                        </div>
                                        <div className="show-details flex-1">
                                            <h3 className="mt-0 mb-0">{booking.show.movie.title}</h3>
                                            <p>Theatre : 
                                                <b>{booking.show.theatre.name}</b>
                                            </p>
                                            <p>
                                                Seats : <b>{booking.seats.join(", ")}</b>
                                            </p>
                                            <p>Date & Time : {" "}
                                                <b>
                                                    {moment(booking.show.date).format("MMM Do YYYY")}{" "}
                                                    {moment(booking.show.time,"HH:mm").format("hh:mm A")}
                                                </b>{" "}
                                            </p>
                                            <p>
                                                Amount : {" "}
                                                <b>Rs.{booking.seats.length*booking.show.ticketPrice}{" "}</b>
                                            </p>
                                            <p>
                                                Booking ID : <b>{booking.transactionId}</b>
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            )
        }
        {
            !bookings.length && (
                <div className="text-center pt-3">
                    <h1>You've not booked any show yet!!</h1>
                    <Link to="/">
                        <Button type="primary">Start Booking</Button>
                    </Link>
                </div>
            )
        }
        </>
    )
}

export default Bookings;