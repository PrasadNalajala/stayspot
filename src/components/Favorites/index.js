import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaHeart, FaTrash, FaEye, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

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
        <div className="min-h-[80vh] py-8 px-2 md:px-8 mt-8">
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
      <div className="min-h-[80vh] py-8 px-2 md:px-8 mt-12">
        <div className="listings-header">
          <h2>Your Favorites</h2>
          {favorites.length > 0 && (
            <button onClick={clearAllFavorites} className="add-listing-btn bg-red-500 hover:bg-red-600">
              Clear All
            </button>
          )}
        </div>
        {favorites.length === 0 ? (
          <div className="no-listings">
            <div className="text-5xl text-green-400 mb-2 animate-bounce"><FaHeart /></div>
            <h3 className="text-2xl font-bold text-white">No favorites yet</h3>
            <p className="text-gray-400 text-center">Start exploring properties and save your favorites to see them here</p>
            <Link to="/browse-rentals" className="add-listing-btn mt-4">
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="listings-grid">
            {favorites.map((rental) => (
              <div key={rental.id} className="listing-card">
                <div className="listing-image">
                  <img src={rental.imageUrl} alt={rental.title} />
                  <button
                    onClick={() => removeFromFavorites(rental.id)}
                    className="delete-btn absolute top-3 right-3"
                    title="Remove from favorites"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="listing-content">
                  <h3>{rental.title}</h3>
                  <p className="location"><FaMapMarkerAlt className="mr-2 text-green-400" /> {rental.location}</p>
                  <p className="price">₹{rental.price}</p>
                  <div className="specs">
                    <span>{rental.bedrooms} Bed</span>
                    <span>{rental.bathrooms} Bath</span>
                    <span>{rental.size}</span>
                  </div>
                  <div className="listing-actions">
                    <Link 
                      to={`/rental/details/${rental.id}`} 
                      className="action-btn view-btn"
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