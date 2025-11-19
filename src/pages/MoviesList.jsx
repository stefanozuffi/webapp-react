import axios from 'axios'
import { useEffect, useState } from 'react'
import jumbo_logo from '../assets/images/jumbo-logo.png'
import MovieCard from '../components/MovieCard'

const server_url = 'http://localhost:3000/api/movies'

export default function MoviesList() {
    const [movies, setMovies] = useState([])
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
    },[])

    useEffect(() => {
        setFilterMovies(movies)
    },[movies])

    useEffect(() => {
        if (searchInput.trim() === '') {
            setFilterMovies(movies)
        } else {
            setFilterMovies(movies.filter(movie => movie.title.toLowerCase().includes(searchInput.toLowerCase())))
        }
        
    }, [searchInput])

    return (
        <main>
            <div className="catalogue-head d-flex justify-content-around align-items-center gap-5 flex-wrap">
                <h2 className='catalogue-title white-title'>Movies Catalogue</h2>
                <div className="search-bar d-flex flex-column">
                    <label className='mb-1' style={{color: 'darkred'}} htmlFor="search-bar"> Search Movie </label>
                    <input className='form-control' type="text" id='search-bar'
                    onChange={(e) => setSearchInput(e.target.value)}/>
                </div>
            </div>
            
            <div className="container mb-5">
                <div className="row">
                    {filterMovies.map(movie => 
                        (<MovieCard 
                            movie={movie}
                        key={movie.id}/>
                    ))}
                    
                </div>
            </div>
        </main>
    )
}