import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaHeart, FaTrash, FaEye, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import './index.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to view your favorites');
        setLoading(false);
        return;
      }

      // For now, we'll get favorites from localStorage
      // In a real app, this would be an API call
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(savedFavorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = (rentalId) => {
    try {
      const updatedFavorites = favorites.filter(fav => fav.id !== rentalId);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast.error('Failed to remove from favorites');
    }
  };

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      setFavorites([]);
      localStorage.removeItem('favorites');
      toast.success('All favorites cleared');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="favorites-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading your favorites...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="favorites-container">
        <div className="favorites-header">
          <div className="favorites-title-section">
            <h2>Your Favorites</h2>
            <p>Properties you've saved for later</p>
          </div>
          {favorites.length > 0 && (
            <button onClick={clearAllFavorites} className="clear-all-btn">
              Clear All
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="no-favorites">
            <div className="no-favorites-icon">
              <FaHeart />
            </div>
            <h3>No favorites yet</h3>
            <p>Start exploring properties and save your favorites to see them here</p>
            <Link to="/browse-rentals" className="browse-btn">
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((rental) => (
              <div key={rental.id} className="favorite-card">
                <div className="favorite-image">
                  <img src={rental.imageUrl} alt={rental.title} />
                  <div className="favorite-overlay">
                    <button
                      onClick={() => removeFromFavorites(rental.id)}
                      className="remove-favorite-btn"
                      title="Remove from favorites"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="favorite-content">
                  <h3>{rental.title}</h3>
                  <p className="location">
                    <FaMapMarkerAlt /> {rental.location}
                  </p>
                  <p className="price">₹{rental.price}</p>
                  <div className="specs">
                    <span>{rental.bedrooms} Bed</span>
                    <span>{rental.bathrooms} Bath</span>
                    <span>{rental.size}</span>
                  </div>
                  <div className="favorite-actions">
                    <Link 
                      to={`/rental/details/${rental.id}`} 
                      className="view-btn"
                    >
                      <FaEye /> View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites; 