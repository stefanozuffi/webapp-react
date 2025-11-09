export default function MovieCard({title, image, avg_rating=4, director, year}) {
    return(
    
            <div className="movie-card col-lg-4 col-md-6 col-sm-12 h-100 g-4">

                    <div className="card-title">
                        <h5>{title}</h5>
                    </div>
            
                    <div className="card-main d-flex g-2">
                        <div className="card-img-ctn">
                                <img className='card-image' src={`/movies_cover/${image}`} alt="placeholder img"/>
                        </div>
                        <div className="average-rating d-flex flex-column justify-content-around">
                                <i className="bi bi-circle-fill"></i>
                                <i className="bi bi-circle-fill"></i>
                                <i className="bi bi-circle-fill"></i>
                                <i className="bi bi-circle-half"></i>
                                <i className="bi bi-circle"></i>
                        </div>
                    </div>
            
                    <div className="card-info">
                            <span className='author fst-italic'> {director} </span>
                            <span className='year'>{year}</span>
                    </div>
                                    
            </div>
    
    )
}