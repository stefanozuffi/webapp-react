import axios from 'axios'
import { useEffect, useState } from 'react'
import jumbo_logo from '../assets/images/jumbo-logo.png'
import MovieCard from '../components/MovieCard'

const server_url = 'http://localhost:3000/api/movies'

export default function MoviesList() {
    const [movies, setMovies] = useState([])

    useEffect(()=> {
        axios.get(server_url)
        .then((res)=>{
            setMovies(res.data)
        })
    },[])

    return (
        <main>
            <h2 className='catalogue-title'>Movies Catalogue</h2>
            <div className="container mb-5">
                <div className="row">
                    {movies.map(movie => 
                        (<MovieCard 
                            title={movie.title} image={movie.image} director={movie.director} avg_rating={movie.avg_rating} year={movie.release_year}
                        key={movie.id}/>
                    ))}
                    
                </div>
            </div>
        </main>
    )
}