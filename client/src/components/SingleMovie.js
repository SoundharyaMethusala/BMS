import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Input, message,Row,Col } from 'antd'; // Make sure to import Input and message if using antd components
import { CalendarOutlined } from '@ant-design/icons'; // Ensure to import icons
import { getSingleMovie } from "../api/movie";
import { getAllTheatreByMovie } from "../api/show";

const SingleMovie = () => {
    const params = useParams();
    const [movie, setMovie] = useState();
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [theatres, setTheatres] = useState([]);
    const navigate = useNavigate();

    const handleDelete = (e) => {
        const selectedDate = moment(e.target.value).format("YYYY-MM-DD");
        setDate(selectedDate);
        navigate(`/movie/${params.id}?date=${selectedDate}`);
    };

    const getData = async () => {
        try {
            const response = await getSingleMovie(params.id);
            if (response.success) {
                setMovie(response.data);
            } else {
                message.error(response.message);
            }
        } catch (err) {
            message.error(err.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const getAllTheatres = async () => {
        try {
            const response = await getAllTheatreByMovie({ movie: params.id, date });
            if (response.success) {
                setTheatres(response.data);
            } else {
                message.error(response.message);
            }
        } catch (err) {
            message.error(err.message);
        }
    };

    useEffect(() => {
        getAllTheatres();
    }, [date]);

    return (
        <div className="inner-container">
            {movie && (
                <div className="d-flex single-movie-div">
                    <div className="flex-shrink-0 me-3 single-movie-img">
                        <img src={movie.poster} width={150} alt="Movie Poster" />
                        <div className="w-100">
                            <h1 className="mt-0">{movie.movieName}</h1>
                            <p className="movie-data">Genre: <span>{movie.language}</span></p>
                            <p className="movie-data">Release Date: <span>{moment(movie.releaseDate).format("MMM Do YYYY")}</span></p>
                            <p className="movie-data">Duration: <span>{movie.duration}</span></p>
                            <br />
                            <div className="d-flex flex-column-mob align-items-center mt-3">
                                <label className="me-3 flex-shrink-0">Choose the Date:</label>
                                <Input
                                    onChange={handleDelete} // Ensure this is the correct handler
                                    type="date"
                                    min={moment().format("YYYY-MM-DD")}
                                    className="max-width-300 mt-8px-mob"
                                    value={date}
                                    placeholder="default size"
                                    prefix={<CalendarOutlined />}
                                />
                            </div>
                        </div>
                        {theatres.length === 0 && (
                            <div className="pt-3">
                                <h2 className="blue-clr">Currently, no theatres available for this movie!!</h2>
                            </div>
                        )}
                        {theatres.length > 0 && (
                            <div className="theatre-wrapper mt-3 pt-3">
                                <h2>Theatres</h2>
                                {theatres.map((theatre) => (
                                    <div key={theatre._id}>
                                        <Row gutter={24}>
                                            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                                                <h3>{theatre.name}</h3>
                                                <p>{theatre.address}</p>
                                            </Col>
                                            <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                                                <ul className="show-ul">
                                                    {theatre.shows.sort((a, b) => moment(a.time, "MM:mm") - moment(b.time, "HH:mm"))
                                                        .map((singleShow) => (
                                                            <li key={singleShow._id} onClick={() => navigate(`/book-show/${singleShow._id}`)}>
                                                                {moment(singleShow.time, "HH:mm").format("hh:mm A")}
                                                            </li>
                                                        ))}
                                                </ul>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleMovie;
