
export default function AdminMovieCard({movie, setDeleting, setShowSafety}) {

    return(
    
        <li>
            <div className="admin-movie d-flex justify-content-between"> 
                <div className="admin-movie-info d-flex flex-column gap-3">

                    <div className="movie-info d-flex gap-5 pb-3">
                            <span style={{fontWeight: '900'}} className="d-block">{movie.title.toUpperCase()}</span>
                            <span className='year'>{movie.release_year}</span>
                    </div>
                    
                    <span className="fst-italic">{movie.director}</span>
                </div>

                <button className="btn" onClick={() => {
                        setDeleting(movie)
                        setShowSafety(true)}}>
                    <i className="bi bi-trash3"></i>
                </button>
            </div>
        </li>
        )

}