import { useState, useEffect, use } from "react";
import axios from "axios";
import MovieForm from "../components/MovieForm";
import AdminMovieCard from "../components/AdminMovieCard";

const server_url = 'http://localhost:3000/api/movies'

export default function AdminPage() {
    const [movies, setMovies] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [showSafety, setShowSafety] = useState(false)
    const [deleting, setDeleting] = useState(null)
    const [submitSwitch, setSubmitSwitch] = useState(0)
    const [activeAcc, setActiveAcc] = useState(0)
    const [filterMovies, setFilterMovies] = useState([])
    const [searchInput, setSearchInput] = useState('')

    useEffect(()=> {
        axios.get(server_url)
        .then(res => {
            setMovies(res.data)
        })
        .catch(err => {
            console.log(err);
            setError(err.message);
          });
    }, [submitSwitch])

    useEffect(() => {
        setFilterMovies(movies)
    },[movies])

    useEffect(() => {
        if (searchInput.trim() === '') {
            setFilterMovies(movies)
        } else {
            setFilterMovies(movies.filter(movie => movie.title.toLowerCase().includes(searchInput.toLowerCase())))
        }
    },[searchInput])




    //Handle Delete Movie
    function handleDelete() {
        axios.delete(`${server_url}/${deleting.id}`)
        .then(res => {
            setShowSafety(false)
            setDeleting(null)
            setSubmitSwitch(1 - submitSwitch)
            alert(res.data.message)
        })
        .catch(err => console.error('Error deleting movie:', err))
    }

    return(
        <main className="admin-page">
            <div className="container">
                <div className="admin-header d-flex justify-content-around flex-wrap gap-5 p-5">

                    <div className="title-search-ctn d-flex flex-column">
                        <h1>Admin Environment</h1>
                    
                        <div className="admin search-bar d-flex flex-column align-self-center">
                            <label className='mb-1' style={{color: 'darkred'}} htmlFor="search-bar"> Search Movie </label>
                            <input className='form-control' type="text" id='search-bar'
                            onChange={(e) => setSearchInput(e.target.value)}/>
                        </div>
                    </div>
                    

                    <button className="btn store-movie-btn align-self-center" onClick={() => setShowForm(true)}> + Add Movie to DB </button>
                </div>

                { showForm && <MovieForm setShowForm={setShowForm} submitSwitch={submitSwitch} setSubmitSwitch={setSubmitSwitch}/>}
            </div>

            <div className="list-ctn container my-5">
                <ul className="admin-movies list-unstyled d-flex flex-column gap-5">
                    {filterMovies.map(movie => {
                        return <AdminMovieCard key={movie.id} movie={movie} setDeleting={setDeleting} setShowSafety={setShowSafety} activeAcc={activeAcc} setActiveAcc={setActiveAcc}/>
                    })}
                </ul>

                {/* Safety POP-UP */}
                <div className={`safety-pop-up p-5 ${showSafety ? 'd-flex flex-column align-items-center' : 'd-none'}`}>
                    
                    <h5 style={{textAlign: 'center'}}>You Are going to permanently delete the movie <span>{deleting?.title.toUpperCase()}</span> with ID:'{deleting?.id}' from the database</h5>
                    
                    <div className="pop-up-main d-flex gap-2">
                        <i className="bi bi-exclamation-triangle"></i>
                        <p>if you want to proceed click 'yes'; otherwise 'no'</p>
                    </div>
                    
                    <div className="btn-ctn d-flex gap-4">
                        <button className="btn btn-yes" onClick={() => handleDelete()}>Yes</button>
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