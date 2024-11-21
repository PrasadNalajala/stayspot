import Navbar from "../Navbar";
import "./index.css";
import RentalItem from "../RentalItem";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ImageGrid from "../Loader";
import { FaSearch } from "react-icons/fa";
import notFound from '../../assets/undraw_empty_re_opql.svg'

const BrowseRentals = (props) => {
  const [rentalsDetails, setRentaldetails] = useState([]);
  const [filteredRentalDetails,setFilteredRentalDetails]=useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput,setSearchInput]=useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
  const fetchRentals = async () => {
    const response = await axios.get("https://stayspot.onrender.com/rentals");
    try {
      if (response.status === 200) {
        setRentaldetails(response.data);
        setFilteredRentalDetails(response.data)
        setIsLoading(false);
      }
    } catch (er) {
      toast.error(er.message);
      setIsLoading(false);
    }
  };

  const onChangeInput=(e)=>{
    setSearchInput(e.target.value)
    if (searchInput===''){
      setFilteredRentalDetails(rentalsDetails)
    }
  }
  const tryAgain=()=>{
    fetchRentals()
  }

  const onClicksearch=()=>{
    const updatedRentalDetails = rentalsDetails.filter(
      (item) =>
        (item.title && item.title.toLowerCase().includes(searchInput.toLowerCase())) ||
        (item.location && item.location.toLowerCase().includes(searchInput.toLowerCase()))
    );
    setFilteredRentalDetails(updatedRentalDetails)
    setSearchInput('')
    setCurrentPage(1);
  }

  useEffect(() => {
    fetchRentals();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRentalDetails.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredRentalDetails.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      {isLoading ? (
        <div style={{ marginTop: "120px", height: "100%" }}>
          <ImageGrid />
        </div>
      ) : (
        <div className="rental-section">
          <div className="search-section">
            <h1 className="availble-rental">Available Rentals</h1>
            <div className="search-input-container">
              <input type="text" className="rental-search-input" placeholder="Search" value={searchInput} onChange={onChangeInput}/>
              <div className="search-icon-container" onClick={onClicksearch}>
                <FaSearch className="search-icon"/>
              </div>
            </div>
          </div>
          <div className="rental-items-section">
            {filteredRentalDetails.length >0?
            <>
            {filteredRentalDetails.map((each) => (
              <RentalItem itemDetails={each} key={each.id} />
            ))}
            
            </> :
            <div className="no-results-wrapper"> 
            <div class="no-results-container">
            <img src={notFound} alt="No Results Found" class="no-results-image" />
            
            <h2 class="no-results-title">No Results Found</h2>
            
            <p class="no-results-description">
                We couldn't find any matches for your search. Try adjusting your search terms or explore other options!
            </p>
            
            <button class="retry-button" onClick={tryAgain}>Try Again</button>
        </div>
        </div>
        
          }
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BrowseRentals;
