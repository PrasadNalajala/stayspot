import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/index.js";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Profile from "./components/Profile/index.js";
import Home from "./components/Home/index.js";
import BrowseRentals from "./components/BrowseRentals/index.js";
import PostRental from "./components/PostRental/index.js";
import AboutUs from "./components/AboutUs/index.js";
import ContactUs from "./components/Contact/index.js";
import RentalDetails from "./components/RentalDetails/index.js";
import YourListings from "./components/YourListings/index.js";
import Favorites from "./components/Favorites/index.js";
import Messaging from "./components/Messaging/index.js";
import ConversationList from "./components/Messaging/ConversationList.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/index.js";
import Footer from "./components/Footer/index.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {/* Removed main-content wrapper to restore previous look */}
        <Routes>
          <Route path="/login" Component={Login} />
          <Route exact path="/" Component={Home} />
          <Route path="browse-rentals" Component={BrowseRentals} />
          <Route path="/post-rental" Component={PostRental} />
          <Route path="/about-us" Component={AboutUs} />
          <Route path="/contact" Component={ContactUs} />
          <Route path="/profile" Component={Profile} />
          <Route path="/your-listings" Component={YourListings} />
          <Route path="/favorites" Component={Favorites} />
          <Route path="/rental/details/:id" Component={RentalDetails} />
          <Route path="/messages" Component={ConversationList} />
          <Route path="/messages/:conversationId" Component={Messaging} />
          <Route path="/message/:conversationId" Component={Messaging} />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          toastClassName="custom-toast"
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
