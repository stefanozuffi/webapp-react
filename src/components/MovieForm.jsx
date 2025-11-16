import axios from "axios";
import { useState } from "react";


const initialData = {
    title: '',
    director: '',
    image: null,
    abstract: '',
    release_year: '',
    genre: ''
}
const server_url = 'http://localhost:3000/api/movies'

export default function MovieForm({setShowForm, submitSwitch, setSubmitSwitch}) {
    const [formData, setFormData] = useState(initialData)

    function handleSubmit(e) {

        e.preventDefault()

        const data = new FormData()
        data.append("title", formData.title)
        data.append("director", formData.director)
        data.append("release_year", formData.release_year)
        data.append("image", formData.image)
        data.append("genre", formData.genre)
        data.append("abstract", formData.abstract) 

        axios.post(server_url, data)
        .then(response => {
            console.log(response)
            if (response.status === 201) {
                setSubmitSwitch(1 - submitSwitch)
                setFormData(initialData)
            }
        }) 
        .catch(err => console.log(err))

    }

    return(
        <div className="form-ctn movie-form-ctn my-5 d-flex flex-column gap-5">
            <button className="btn trash-movie-store show align-self-center" onClick={() => setShowForm(false)}> Cancel Operation </button>
            <form encType="multipart/form-data" className="movie-form" action="submit"
            onSubmit={(e) => handleSubmit(e)}>

                        <div className="my-2">
                            <label htmlFor="title">Movie Title</label>
                            <input type="text" className="form-control" name="title" id="title"
                            onChange={(e) => setFormData({...formData, title: e.target.value })}/>
                        </div>

                        <div className="my-2 d-flex justify-content-around">

                            <div className="director-input">
                                <label htmlFor="director">Director's fullname </label>
                                <input type="text" className="form-control" name="director" id="director"
                                onChange={(e) => setFormData({...formData, director: e.target.value })}/>
                            </div>

                            <div className="genre-input">
                                <label htmlFor="genre"> Genre </label>
                                <input type="text" className="form-control" name="release_year" id="release_year"
                                onChange={(e) => setFormData({...formData, genre: e.target.value })}/>
                            </div>

                            <div className="release-year-input">
                                <label htmlFor="release-year">Release Year </label>
                                <input type="text" className="form-control" name="release_year" id="release_year"
                                onChange={(e) => setFormData({...formData, release_year: e.target.value })}/>
                            </div>

                        </div>

                        <div className="my-2">
                            <label htmlFor="image"> Upload a cover image for the movie </label>
                            <input type="file" className="form-control" name="image" id="image" 
                            onChange={(e) => setFormData({...formData, image: e.target.files[0] })}/>
                        </div>

                        <div className="my-2">
                            <label htmlFor="abstract"> Abstract </label>
                            <input type="text" className="form-control" name="abstract" id="abstract"
                            onChange={(e) => setFormData({...formData, abstract: e.target.value })}/>
                        </div>
                        
                        <button type="submit" className="btn submit-movie-btn" onSubmit={() => {setShowForm(false)}}> Create Movie </button>
            

            </form>

        </div>)
       
}