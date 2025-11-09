import { NavLink } from 'react-router-dom'
import logo from '../assets/images/MOVIES-logo.png'

export default function AppHeader() {
    return(
        <header>
            <div className="header-ctn d-flex justify-content-around align-items-center flex-wrap my-3">
                <div className="logo-ctn">
                    <img className='logo' src={logo} alt="logo" />
                </div>

                <div className="navbar-ctn">
                    <nav className='d-flex gap-4 fs-5'>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/movies">Catalogue</NavLink>
                        <NavLink to="/admin">Admin</NavLink>
                    </nav>
                </div>
            </div>
            
            
        </header>
    )
}