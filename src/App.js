import logo from './logo.svg';
import './App.css';
import Login from './components/Login/index.js'
import {BrowserRouter,Routes,Route,Switch} from 'react-router-dom'
import Navbar from './components/Navbar/index.js';
import Home from './components/Home/index.js';
import BrowseRentals from './components/BrowseRentals/index.js';
import PostRental from './components/PostRental/index.js';
import AboutUs from './components/AboutUs/index.js';
import ContactUs from './components/Contact/index.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>
        
          <Route  path='/login' Component={Login}/>
          <Route exact path='/' Component={Home}/>
          <Route path='browse-rentals' Component={BrowseRentals}/>
          <Route path='/post-rental' Component={PostRental}/>
          <Route path='/about-us' Component={AboutUs} />
          <Route path='/contact' Component={ContactUs}/>
      </Routes>
      <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
