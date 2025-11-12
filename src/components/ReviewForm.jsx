import { useEffect, useState } from "react"
import axios from "axios"

const initialData = {
    name: '',
    text: ''
}
const server_url = 'http://localhost:3000/api/movies'


export default function ReviewForm({movie_id, revSwitch, setRevSwitch}) {

    const [showForm, setShowForm] = useState(false)
    const [selectedRating, setSelectedRating] = useState(0)
    const [formData, setFormData] = useState(initialData)

    useEffect(() => {
        setFormData({...formData, vote: selectedRating})
    }, [selectedRating])


    function handleSubmit(e) {

        e.preventDefault()

        axios.post(`${server_url}/${movie_id}/reviews`, formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(res => {
            console.log(res)
            setSelectedRating(0)
            setFormData(initialData)
            setShowForm(false)
            setRevSwitch(1 - revSwitch)
        })
        .catch(err => {
            console.log(err)
        })

        
    }

    return (
        <div className="form-ctn"> 

            <button className={`add-rev-btn ${!showForm ? 'show' : ''}`} onClick={()=>setShowForm(true)}> + Add Review </button>
            <button className={`trash-rev-btn ${showForm ? 'show' : ''}`} onClick={()=> {
                setShowForm(false)
                setSelectedRating(0)
                setFormData(initialData)
                }}>x Trash Review</button>

            <form className={`review-form ${showForm ? 'show' : ''} my-4`} 
             onSubmit={handleSubmit}>

                <div className="form-header d-flex gap-5">
                    <div className="name-input-ctn">
                        <label htmlFor="name" className="form-label">Let us know what you think about the movie!</label>
                        <input name="name" type="text" className="form-control" id="name" value={formData.name} placeholder="your name"
                        onChange={(e) => {setFormData({...formData, name: e.target.value})}}/>
                    </div>


                    <div className="rating-input-ctn d-flex gap-4">
                        {Array.from({length: 5}, (_, i) => {

                            const ratingValue = i + 1;
                            
                            return (
                                <button
                                    key={ratingValue}
                                    type="button"
                                    onClick={() => {
                                        setSelectedRating(ratingValue);
                                    }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        cursor: 'pointer',
                                        fontSize: 'inherit'
                                    }}
                                    className="rating-btn"
                                >
                                    <i className={`bi bi-circle${ratingValue <= selectedRating ? '-fill' : ''} rr-i`} />
                                </button>
                        );
                    })}
                    
                    </div>
                </div>
          

                <div className="text-input-ctn">
                    <textarea name="review" className="review-text" rows={7}  value={formData.text} placeholder="...your review..." id="review"
                    onChange={(e) => {setFormData({...formData, text: e.target.value})}}></textarea>
                </div>

                <div className="submit-btn-ctn d-flex flex-row-reverse">
                    <button type="submit" className="btn btn-dark">Submit Review</button>
                </div>
                

             </form>
        </div>
       
    )
}