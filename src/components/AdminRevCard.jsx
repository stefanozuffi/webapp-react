import { use, useState } from "react"
import Rating from "./Rating"

export default function AdminRevCard({rev, setShowSafetyRev, setDeletingRev}) {
    

    return(
        <div style={{backgroundColor: '#1b1b1b'}} className="admin-rev-card review-ctn p-3 my-5">

            <div className="review-header d-flex justify-content-between">
                        <h5>{rev.name}</h5>
                      
                        <Rating rating={rev.vote} dir={'row'}/>
                            
            </div>

            <div className="d-flex justify-content-between">
                <p className="nunito">{rev.text}</p>
                <button className="btn erase-btn" onClick={() => {
                    setShowSafetyRev(true)
                    setDeletingRev(rev)}}>
                    <i className="bi bi-x-octagon"></i>
                </button>
            </div>                      
            
        </div>
    )
}