import { useState, useEffect, useRef } from "react";
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
    const [searchInput, setSearchInput] = useState({
        title: '',
        director: '',
        genre: '',
        rating_range: {
            n_a: true, 
            start_value: null, 
            end_value: null 
        }
    })

    const prevSearchRef = useRef(searchInput);

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

        const prev = prevSearchRef.current

        const changedField = Object.keys(searchInput).find(key => searchInput[key] !== prev[key])

        if (isEmpty()) {
            setFilterMovies(movies) 
        }

        else if (changedField) {
            setFilterMovies(filter(changedField)) 
        }  

        prevSearchRef.current = searchInput 

    },[searchInput]) 


    //Utilities for advanced Admin-Search
    function filter(field) {
        if (field !== 'rating_range') {
            return movies.filter(movie => 
                movie[field].toLowerCase().includes(searchInput[field].toLowerCase())
            )
        }
        
        // Rating range filter
        const { start_value, end_value, n_a } = searchInput.rating_range
        
        return movies.filter(movie => {
            const rating = movie.avg_rating
            
            // Includi film senza rating se n_a è true
            if (!rating && n_a) return true
            if (!rating && !n_a) return false
            
            // Filtro per range
            if (start_value && !end_value) {
                return rating >= Number(start_value)
            }
            if (!start_value && end_value) {
                return rating <= Number(end_value)
            }
            if (start_value && end_value) {
                return rating >= Number(start_value) && rating <= Number(end_value)
            }
            
            // Se non c'è range, mostra tutti
            return true
        })
    }


    function isEmpty() {
            return Object.keys(searchInput).every(key => {
        if (key === 'rating_range') {
            return !searchInput[key].start_value && !searchInput[key].end_value
        }
        return searchInput[key].trim() === ''
    })
    }




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
                            {/* Title */}
                            <div className="search-component">
                                <label className='mb-1' style={{color: 'darkred'}} htmlFor="search-bar"> Search Movie </label>
                                <input className='form-control' type="text" id='search-bar-title'
                                onChange={(e) => setSearchInput({...searchInput, title: e.target.value})}/>
                            </div>

                            {/* Director */}
                            <div className="search-component">
                                <label className='mb-1' style={{color: 'darkred'}} htmlFor="search-bar"> Search Director </label>
                                <input className='form-control' type="text" id='search-bar-director'
                                onChange={(e) => setSearchInput({...searchInput, director: e.target.value})}/>
                            </div>

                            {/* Genre */}
                            <div className="search-component">
                                <label className='mb-1' style={{color: 'darkred'}} htmlFor="search-bar"> Search Genre </label>
                                <input className='form-control' type="text" id='search-bar-genre'
                                onChange={(e) => setSearchInput({...searchInput, genre: e.target.value})}/>
                            </div>

                            {/* Rating Range */}
                            <div className="search-component">
                                <label className='mb-1' style={{color: 'darkred'}} htmlFor="search-bar"> Rating Range </label>

                                <div className="rating-search d-flex justify-content-around">
                                    <input className='form-control' type="number" id='search-bar-rating-start' placeholder="min"
                                    value={searchInput.rating_range.start_value || ''}
                                    min="1" 
                                    max="5" 
                                    step="1" 
                                    onChange={(e) => setSearchInput({...searchInput, rating_range: {...searchInput.rating_range, start_value: e.target.value }})}/>

                                    <input className='form-control' type="number" id='search-bar-rating-end' placeholder="max"
                                    value={searchInput.rating_range.end_value || ''}
                                    min="1" 
                                    max="5" 
                                    step="1" 
                                    onChange={(e) => setSearchInput({...searchInput, rating_range: {...searchInput.rating_range, end_value: e.target.value }})}/>
                                
                                    <div className="checkbox d-flex gap-2">
                                        <label htmlFor="checkbox"> include n/a</label>
                                        <input className="n-a" type="checkbox" id="n-a" name="n-a"
                                        checked={searchInput.rating_range.n_a}
                                        onChange={(e) => setSearchInput({...searchInput, rating_range: {...searchInput.rating_range, n_a: e.target.checked }})}/>
                                    </div>
                                </div>
                                
                            </div>
                            
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