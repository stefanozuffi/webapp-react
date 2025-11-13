import axios from 'axios'
import { useEffect, useState } from 'react'
import jumbo_logo from '../assets/images/jumbo-logo.png'
import MovieCard from '../components/MovieCard'

const server_url = 'http://localhost:3000/api/movies'

export default function MoviesList() {
    const [movies, setMovies] = useState([])

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

    return (
        <main>
            <h2 className='catalogue-title white-title'>Movies Catalogue</h2>
            <div className="container mb-5">
                <div className="row">
                    {movies.map(movie => 
                        (<MovieCard 
                            movie={movie}
                        key={movie.id}/>
                    ))}
                    
                </div>
            </div>
        </main>
    )
}