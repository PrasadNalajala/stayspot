import logo from './logo.svg';
import './App.css';
import Login from './components/Login/index.js'
import {BrowserRouter,Routes,Route,Switch} from 'react-router-dom'
import Navbar from './components/Navbar/index.js';
import Home from './components/Home/index.js';
import BrowseRentals from './components/BrowseRentals/index.js';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>
        
          <Route  path='/login' Component={Login}/>
          <Route exact path='/' Component={Home}/>
          <Route path='browse-rentals' Component={BrowseRentals}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
