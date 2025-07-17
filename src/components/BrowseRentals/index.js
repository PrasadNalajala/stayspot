import Navbar from "../Navbar";
import "./index.css";
import RentalItem from "../RentalItem";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ImageGrid from "../Loader";
import { FaSearch, FaSort, FaFilter, FaTimes } from "react-icons/fa";
import notFound from '../../assets/undraw_empty_re_opql.svg'

const BrowseRentals = (props) => {
  const [rentalsDetails, setRentaldetails] = useState([]);
  const [filteredRentalDetails, setFilteredRentalDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [location, setLocation] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchRentals = async () => {
    try {
      const response = await axios.get("https://stayspot.onrender.com/rentals", {
        params: {
          location,
          price_min: priceMin,
          price_max: priceMax,
          bedrooms,
          bathrooms,
          status,
          sort_by: sortBy || undefined
        },
      });
      
      if (response.status === 200) {
        setRentaldetails(response.data);
        setFilteredRentalDetails(response.data);
        setIsLoading(false);
      }
    } catch (er) {
      toast.error(er.message);
      setIsLoading(false);
    }
  };

  const handleSortChange = async (e) => {
    const newSortValue = e.target.value;
    setSortBy(newSortValue);
    
    try {
      const response = await axios.get("https://stayspot.onrender.com/rentals", {
        params: {
          location,
          price_min: priceMin,
          price_max: priceMax,
          bedrooms,
          bathrooms,
          status,
          sort_by: newSortValue || undefined
        },
      });
      
      if (response.status === 200) {
        setRentaldetails(response.data);
        setFilteredRentalDetails(response.data);
      }
    } catch (er) {
      toast.error(er.message);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'location':
        setLocation(value);
        break;
      case 'priceMin':
        setPriceMin(value);
        break;
      case 'priceMax':
        setPriceMax(value);
        break;
      case 'bedrooms':
        setBedrooms(value);
        break;
      case 'bathrooms':
        setBathrooms(value);
        break;
      case 'status':
        setStatus(value);
        break;
      default:
        break;
    }
  };

  const applyFilters = () => {
    fetchRentals();
    setShowFilters(false);
  };

  const onChangeInput = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value === '') {
      setFilteredRentalDetails(rentalsDetails);
    }
  };

  const onClicksearch = () => {
    const updatedRentalDetails = rentalsDetails.filter(
      (item) =>
        (item.title && item.title.toLowerCase().includes(searchInput.toLowerCase())) ||
        (item.location && item.location.toLowerCase().includes(searchInput.toLowerCase()))
    );
    setFilteredRentalDetails(updatedRentalDetails);
    setSearchInput('');
  };

  const tryAgain = () => {
    fetchRentals();
  };

  useEffect(() => {
    fetchRentals();
  }, []);
  const getAppliedFilters = () => {
    const filters = [];
    if (priceMin) filters.push(`Min Rent → ₹${priceMin}`);
    if (priceMax) filters.push(`Max Rent → ₹${priceMax}`);
    if (bedrooms) filters.push(`Bedrooms → ${bedrooms}`);
    if (bathrooms) filters.push(`Bathrooms → ${bathrooms}`);
    if (status) filters.push(`Status → ${status.charAt(0).toUpperCase() + status.slice(1)}`);
    return filters;
  };

  return (
    <div className="browse-rentals-container">
      {/* <Navbar /> */}
      {isLoading ? (
        <div className="loading-container">
          <ImageGrid />
        </div>
      ) : (
        <div className="rental-section">
          <div className="search-section">
            <h1 className="availble-rental">Available Rentals</h1>
            
            <div className="search-input-container">
              <input 
                type="text" 
                className="rental-search-input" 
                placeholder="Search by title or location..." 
                value={searchInput} 
                onChange={onChangeInput}
              />
              <button className="search-button" onClick={onClicksearch}>
                <FaSearch className="search-icon"/>
              </button>
            </div>

            <button 
              className="filter-toggle" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {showFilters && (
              <div className="filter-section">
                <div className="filter-header">
                  <h3>Filter Properties</h3>
                  <button className="close-filters" onClick={() => setShowFilters(false)}>
                    <FaTimes />
                  </button>
                </div>
                <div className="filter-grid">
                  <div className="filter-group">
                    <label>Min Rent</label>
                    <input 
                      type="number" 
                      name="priceMin" 
                      placeholder="Min Rent" 
                      value={priceMin} 
                      onChange={handleFilterChange} 
                    />
                  </div>
                  <div className="filter-group">
                    <label>Max Rent</label>
                    <input 
                      type="number" 
                      name="priceMax" 
                      placeholder="Max Rent" 
                      value={priceMax} 
                      onChange={handleFilterChange} 
                    />
                  </div>
                  <div className="filter-group">
                    <label>Bedrooms</label>
                    <input 
                      type="number" 
                      name="bedrooms" 
                      placeholder="Number of bedrooms" 
                      value={bedrooms} 
                      onChange={handleFilterChange} 
                    />
                  </div>
                  <div className="filter-group">
                    <label>Bathrooms</label>
                    <input 
                      type="number" 
                      name="bathrooms" 
                      placeholder="Number of bathrooms" 
                      value={bathrooms} 
                      onChange={handleFilterChange} 
                    />
                  </div>
                  <div className="filter-group">
                    <label>Status</label>
                    <select 
                      name="status" 
                      value={status} 
                      onChange={handleFilterChange}
                    >
                      <option value="">Select Status</option>
                      <option value="available">Available</option>
                      <option value="not available">Not Available</option>
                    </select>
                  </div>
                </div>
                <button onClick={applyFilters} className="apply-filters-btn">
                  Apply Filters
                </button>
              </div>
            )}
            {/* Applied Filters Summary */}
            {getAppliedFilters().length > 0 && (
              <div className="applied-filters-summary" style={{margin: '18px 0 0 0', display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                {getAppliedFilters().map((filter, idx) => (
                  <span key={idx} style={{background: '#20c75522', color: '#20c755', borderRadius: '6px', padding: '4px 12px', fontSize: '0.95rem', fontWeight: 500}}>{filter}</span>
                ))}
              </div>
            )}
          </div>

          <div className="sort-section">
            {/* On mobile, show only the select, not the container or icon */}
            <select 
              name="sortBy" 
              value={sortBy} 
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="">Sort By</option>
              <option value="price">Price: Low to High</option>
              <option value="bedrooms">Bedrooms: Low to High</option>
              <option value="bathrooms">Bathrooms: Low to High</option>
              <option value="available_from">Date: Oldest First</option>
            </select>
          </div>

          <div className="rental-items-section">
            {filteredRentalDetails.length > 0 ? (
              filteredRentalDetails.map((each) => (
                <RentalItem itemDetails={each} key={each.id} />
              ))
            ) : (
              <div className="no-results-wrapper"> 
                <div className="no-results-container">
                  <img src={notFound} alt="No Results Found" className="no-results-image" />
                  <h2 className="no-results-title">No Results Found</h2>
                  <p className="no-results-description">
                    We couldn't find any matches for your search. Try adjusting your filters or explore other options!
                  </p>
                  <button className="retry-button" onClick={tryAgain}>
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BrowseRentals;
