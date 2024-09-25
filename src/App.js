import logo from './logo.svg';
import './App.css';
import Login from './components/Login/index.js'
import {BrowserRouter,Routes,Route,Switch} from 'react-router-dom'
import Navbar from './components/Navbar/index.js';
import Home from './components/Home/index.js';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        
          <Route exact path='/login' Component={Login}/>
          <Route  path='/' Component={Home}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
