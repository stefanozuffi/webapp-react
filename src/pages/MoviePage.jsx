import { useParams } from "react-router-dom";
import axios from 'axios';
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";

const server_url = 'http://localhost:3000/api/movies'

export default function MoviePage() {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)

    useEffect(()=>{
        axios.get(`${server_url}/${id}`)
        .then(res => setMovie(res.data))
        .catch(err => {
            console.log(err);
          });
    }, [])

    return(
        <main>
            <section className="movie-section d-flex flex-column gap-5">

                <div className="movie-header">
                   
                        <div className="card-title">
                            <h5>{movie?.title}</h5>
                        </div>
                    
                </div>

                <div className="movie-main container d-flex justify-content-around">
                    <img src={`/movies_cover/${movie?.image}`} alt="movie cover"/>
                    <div className="card-info flex-column">
                        <span className="fst-italic author"> <span className="nunito"> by </span>
                            {movie?.director}</span> 
                        <span className="genre"><span className="nunito"> genre: </span> {movie?.genre.toUpperCase()}</span>
                        <p className="abstract nunito"> {movie?.abstract} </p>
                        <span className="year"> {movie?.release_year} </span>
                    </div>
                    
                </div>

                <div className="footer">
                    <Rating rating={movie?.avg_rating} dir={'row'}/>
                </div>
            </section>

            <section className="review-section"> 
                    <h2 className="white-title">Reviews</h2>
                    <div className="container">
                        <ReviewForm/>
                    </div>

                    <div className="reviews-ctn container d-flex flex-column gap-5 my-5">

                        {movie?.reviews.map((review,i) => {
                            return(
                                <div key={i} className="review-ctn p-3">
                                    <div className="review-header d-flex justify-content-between">
                                        <h5>{review.name}</h5>
                                        <Rating rating={review.vote} dir={'row'}/>
                                    </div>
                                    
                                    <p className="nunito">{review.text}</p>
                                </div>
                            )
                        })}

                    </div>
                    
            </section>
        </main>
        

        
    )
}