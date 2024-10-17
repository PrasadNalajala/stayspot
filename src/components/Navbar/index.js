import './index.css'
import { Link } from 'react-router-dom'
const Navbar=()=>{
    return(
        <div className="nav-container">
            <Link className="logo-container" to="/" style={{textDecoration:'none'}}>
            <p>StaySpot</p>

            </Link>
            <div className="nav-items-container">
                <ul>
                   <Link to='/' className='nav-link'>Home</Link>
                    <Link to='/about-us' className='nav-link'>About</Link>
                    <Link to="/browse-rentals" className='nav-link'>Browse</Link>
                    <Link to='/post-rental' className='nav-link'>Post</Link>
                   <Link to="/contact" className='nav-link'>Contact </Link>
                    
                </ul>
            </div>
        </div>
    )
}

export default Navbar