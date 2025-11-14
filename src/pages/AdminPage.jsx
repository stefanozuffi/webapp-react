import { useState, useEffect, use } from "react";
import axios from "axios";
import MovieForm from "../components/MovieForm";

const server_url = 'http://localhost:3000/api/movies'

export default function AdminPage() {
    const [movies, setMovies] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [showSafety, setShowSafety] = useState(false)
    const [deleting, setDeleting] = useState(null)

    useEffect(()=> {
        axios.get(server_url)
        .then(res => {
            setMovies(res.data)
        })
        .catch(err => {
            console.log(err);
            setError(err.message);
          });
    },[])

    return(
        <main className="admin-page">
            <div className="container">
                <div className="admin-header d-flex justify-content-around p-5">
                    <h2>Admin Page</h2>
                    <button className="btn store-movie-btn" onClick={() => setShowForm(true)}> + Add Movie to DB </button>
                </div>

                { showForm && <MovieForm setShowForm={setShowForm}/> }
            </div>

            <div className="list-ctn container my-5">
                <ul className="admin-movies list-unstyled d-flex flex-column gap-5">
                    {movies.map(movie => {
                        return <li key={movie.id}>
                            <div className="admin-movie d-flex justify-content-between p-2">
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
                    })}
                </ul>

                <div className={`safety-pop-up p-5 ${showSafety ? 'd-flex flex-column align-items-center' : 'd-none'}`}>
                    <h5 style={{textAlign: 'center'}}>You Are going to permanently delete the movie <span>{deleting?.title.toUpperCase()}</span> with ID:'{deleting?.id}' from the database</h5>
                    <div className="pop-up-main d-flex gap-2">
                        <i className="bi bi-exclamation-triangle"></i>
                        <p>if you want to proceed click 'yes'; otherwise 'no'</p>
                    </div>
                    
                    <div className="btn-ctn d-flex gap-4">
                        <button className="btn btn-yes" onClick={() => console.log('to implement')}>Yes</button>
                        <button className="btn btn-dark" onClick={() => {
                            setShowSafety(false)
                            setDeleting(null)
                        }}>No</button>
                    </div>
                </div>
            </div>
        </main>
    )
}