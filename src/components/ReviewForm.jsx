import { useState } from "react"

export default function ReviewForm() {
    const [showForm, setShowForm] = useState(false)
    const [selectedRating, setSelectedRating] = useState(0)

    return (
        <div className="form-ctn">
            <button className={`add-rev-btn ${!showForm ? 'show' : ''}`} onClick={()=>setShowForm(true)}> + Add Review </button>
            <button className={`trash-rev-btn ${showForm ? 'show' : ''}`} onClick={()=>setShowForm(false)}>x Trash Review</button>
             <form className={`review-form ${showForm ? 'show' : ''} my-4`}>
             <div className="form-header d-flex gap-5">
                <div className="name-input-ctn">
                    <label htmlFor="name" className="form-label">let us know what you think about the movie!</label>
                    <input name="name" type="text" className="form-control" id="name" placeholder="your name"/>
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
                <textarea name="review" className="review-text" rows={7} placeholder="...your review..." id="review"></textarea>
            </div>

            <div className="submit-btn-ctn d-flex flex-row-reverse">
                <button type="submit" className="btn btn-dark">Submit Review</button>
            </div>
            

             </form>
        </div>
       
    )
}