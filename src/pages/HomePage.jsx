import jumbo_logo from '../assets/images/jumbo-logo.png'

export default function HomePage() {
    return(
        <main className="container d-flex flex-column space-around">
            <div className="jumbo-ctn p-2 mb-4 rounded-3 home-comp"> 
                <div className="container-fluid py-4 d-flex flex-column align-items-center gap-3">
                    <h3 className="display-6 fw-bold"> Ever Heard of CinePedia?</h3>
                    <div className="jumbo-img-ctn">
                        <img className='jumbo-img' src={jumbo_logo} alt="jumbo-image" />
                    </div>
                    <p className="col-md-8 fs-4">
                        Join a community where you can share, read and edit reviews and opinions from movies addicts
                        and cinephiles all around the globe! 
                    </p>
                </div>
            </div>
            
        </main>
    )
}