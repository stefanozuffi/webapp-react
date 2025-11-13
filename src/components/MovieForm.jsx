import { useState } from "react";

export default function MovieForm({showForm, setShowForm}) {
    return(
        <div className="form-ctn movie-form-ctn my-5 d-flex flex-column gap-5">
            <button className="btn trash-movie-store show align-self-center" onClick={() => setShowForm(false)}> Cancel Operation </button>
            <form className="movie-form" action="submit">

                        <div className="my-2">
                            <label htmlFor="">Movie Title</label>
                            <input type="text" className="form-control" name="name" id="name"/>
                        </div>

                        <div className="my-2">
                            <label htmlFor="">Director's fullname </label>
                            <input type="text" className="form-control" name="director" id="director"/>
                        </div>

                        <div className="my-2">
                            <label htmlFor=""> Upload a cover image for the movie </label>
                            <input type="file" className="form-control" name="image" id="image" />
                        </div>

                        <div className="my-2">
                            <label htmlFor=""> Abstract </label>
                            <input type="text" className="form-control" name="abstract" id="abstract"/>
                        </div>
                        
                        <button type="submit" className="btn submit-movie-btn" onSubmit={() => {setShowForm(false)}}> Create Movie </button>
            

            </form>

        </div>)
       
}