import './index.css'
import { Link } from 'react-router-dom'
const Navbar=()=>{
    return(
        <div className="nav-container">
            <div className="logo-container">
            <p>StaySpot</p>

            </div>
            <div className="nav-items-container">
                <ul>
                   <Link to='/' className='nav-link'>Home</Link>
                    <Link to='/about' className='nav-link'>About</Link>
                    <Link to="/browse-rentals" className='nav-link'>Browse</Link>
                   <Link to="/contact" className='nav-link'>Contact </Link>
                    
                </ul>
            </div>
        </div>
    )
}

export default Navbar