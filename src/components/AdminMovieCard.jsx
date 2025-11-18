import { useEffect, useState } from "react"
import axios from "axios"
import AdminRevCard from "./AdminRevCard"


const server_url = 'http://localhost:3000/api/movies'

export default function AdminMovieCard({movie, setDeleting, setShowSafety, activeAcc, setActiveAcc}) {
    const [reviews, setReviews] = useState([])
    const [deletingRev, setDeletingRev] = useState(null)
    const [showSafetyRev, setShowSafetyRev] = useState(false)
    const [revSwitch, setRevSwitch] = useState(0)
    

    useEffect(() => {
        axios.get(`${server_url}/${movie.id}/reviews`)
        .then(res => setReviews(res.data))
        .catch(err => console.log(err))
    },[activeAcc, revSwitch])

    function handleRevDelete() {
        axios.delete(`${server_url}/${deletingRev.movie_id}/reviews/${deletingRev.id}`)
        .then(res => {
            setShowSafetyRev(false)
            setDeletingRev(null)
            setRevSwitch(1 - revSwitch)
            alert(res.data.message)})

        .catch(err => console.log('Error deleting review', err))
    }

    const imgPath = movie.image.startsWith('http') ? movie.image : `/movies_cover/${movie.image}`

    return(
    
        <li>
            <div className="admin-movie d-flex flex-column"> 
                <div className="acc-head d-flex justify-content-between">
                        <div className="left-ctn d-flex align-items-center gap-2">
                            <div className="acc-btn-ctn">
                                {activeAcc !== movie.id && <button className="btn acc-btn" onClick={() => setActiveAcc(movie.id)}> {'>'} </button>}
                                {activeAcc === movie.id && <button className="btn acc-btn" onClick={() => setActiveAcc(0)}> {'<'} </button>}
                                
                            </div>
                            <div className="admin-movie-info d-flex flex-column gap-3">

                                <div className="movie-info d-flex gap-5 pb-3">
                                        <span style={{fontWeight: '900'}} className="d-block">{movie.title.toUpperCase()}</span>
                                        <span className='year'>{movie.release_year}</span>
                                </div>
                                
                                <span className="fst-italic">{movie.director}</span>
                            </div>
                        </div>

                        <button className="btn" onClick={() => {
                            setDeleting(movie)
                            setShowSafety(true)}}>
                                <i className="bi bi-trash3"></i>
                        </button>
                </div>
                
               {activeAcc === movie.id && 
               
                    <div className="acc-body"> 
                        <div className="d-flex gap-5 justify-content-center">
                            <div className="admin-image-ctn">
                                <img className="admin-img" src={imgPath} alt="admin-movie-image"/>
                            </div>
                            <div className="adv-info d-flex flex-column justify-content-center gap-5">
                                <span className="fw-bold"> genre: {movie.genre.toUpperCase()}</span>
                                <p>
                                    {movie.abstract}
                                </p>
                            </div>
                        </div>
                        


                        

                        {reviews.length > 0 && 
                        reviews.map(rev => <AdminRevCard rev={rev} setShowSafetyRev={setShowSafetyRev} setDeletingRev={setDeletingRev} key={rev.id}/>)}
                        {reviews.length === 0 && 
                        <p className="my-5 fst-italic">No reviews for this movie-item yet</p>} 
                    </div>}

                    {/* SAFETY POP-UP */}
                    <div className={`safety-pop-up p-5 ${showSafetyRev ? 'd-flex flex-column align-items-center' : 'd-none'}`}>
                    
                        <h5 style={{textAlign: 'center'}}>You Are going to permanently delete the review written by {deletingRev?.name.toUpperCase()} with id: {deletingRev?.id} regarding the movie with id: {deletingRev?.movie_id}</h5>
                        
                        <div className="pop-up-main d-flex gap-2">
                            <i className="bi bi-exclamation-triangle"></i>
                            <p>if you want to proceed click 'yes'; otherwise 'no'</p>
                        </div>
                        
                        <div className="btn-ctn d-flex gap-4">
                            <button className="btn btn-yes" onClick={handleRevDelete}>Yes</button>
                            <button className="btn btn-dark" onClick={() => {
                                setShowSafetyRev(false)
                                setDeletingRev(null)
                            }}>No</button>
                        </div>
                    </div>
                
            </div>
        </li>
        )

}