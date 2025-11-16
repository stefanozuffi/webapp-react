import { Link } from "react-router-dom"
import Rating from "./Rating"


export default function MovieCard({movie}) {

    const imgPath = movie.image.startsWith('http') ? movie.image : `/movies_cover/${movie.image}`;

    return(
    
            <div className="movie-card col-lg-4 col-md-6 col-sm-12 g-4">

                    <div className="card-title">
                        <h5>{movie.title}</h5>
                    </div>
            
                    <div className="card-main d-flex g-2">
                        <div className="card-img-ctn">
                                <Link to={`/movies/${movie.id}`}>
                                        <img className='card-image' src={imgPath} alt="placeholder img"/>
                                </Link>
                                
                        </div>
                        
                        <Rating rating={movie.avg_rating}/>
                    </div> 
            
                    <div className="card-info"> 
                            <span className='author fst-italic'> {movie.director} </span> 
                            <span className='year'>{movie.release_year}</span> 
                    </div> 
                                    
            </div> 
    
    )
}