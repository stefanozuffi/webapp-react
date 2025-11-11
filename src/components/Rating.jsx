import { roundToHalf } from "../assets/utils/functions"

export default function Rating({rating, dir='column', gap='3'}) {
    const roundedRating = roundToHalf(rating)
    const full_point = Math.floor(roundedRating)
    const half_point = roundedRating % 1 !== 0
    const empty_point = 5 - Math.ceil(roundedRating)

    return(
        <div className={`rating d-flex flex-${dir} justify-content-around gap-${gap} ms-2`}>

            {Array.from({length: full_point}, (_,i) => <i key={i} className="bi bi-circle-fill"></i> )}
            {half_point && <i className="bi bi-circle-half"></i>}
            {Array.from({length: empty_point}, (_,i) => <i key={i} className="bi bi-circle"></i> )}
                        
        </div>
    )
}