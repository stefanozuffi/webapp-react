import { NavLink } from 'react-router-dom'
import jumbo_logo from '../assets/images/jumbo-logo.png'
import cozy_movie from '../assets/images/cozy-movie.png'

export default function HomePage() {
    return(
        <main className="home-ctn container d-flex flex-column gap-5">
            <section className='intro-section'>
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
            </section>

            <section className='browse-section'>
                <div className="browse-ctn">
                    <div className="section-header">
                        <h3>Browse Endless Titles!</h3>
                    </div>

                        <div className="section-content d-flex justify-content-center">
                            <div className="sect-text d-flex flex-column justify-content-center gap-4 mt-4">
                                <p>Explore an extensive catalogue from all times movies,
                                    where you will be given all the approiate information to choose the perfect 
                                    movie for the perfect situation.
                                </p>
                                <NavLink to='/movies'>
                                    <button className='btn btn-dark browse-btn'>Browse Titles </button>
                                </NavLink>
                            </div>

                            <div className="sect-img d-flex justify-content-center align-items-center">
                                <img src={cozy_movie} alt="cozy-image"/>
                            </div>
                        </div>
                    

                </div>
            </section>

            <section className='community-section'>

            </section>
            
            
        </main>
    )
}