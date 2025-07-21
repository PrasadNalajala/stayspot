import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './index.css';

const YourListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    description: '',
    availableFrom: '',
    amenities: [],
    status: 'available',
    contact_name: '',
    contact_phone: ''
  });

  const fetchUserListings = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login to view your listings');
        return;
      }
      
      const response = await axios.get('https://stayspot.onrender.com/api/user/rentals', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
      if (error.response?.status === 401) {
        toast.error('Please login to view your listings');
      } else {
        toast.error('Failed to fetch your listings');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserListings();
  }, []);

  const handleEdit = (listing) => {
    setSelectedListing(listing);
    // Parse amenities if it's a string
    let amenitiesArray = [];
    if (listing.amenities) {
      try {
        amenitiesArray = typeof listing.amenities === 'string' 
          ? JSON.parse(listing.amenities) 
          : listing.amenities;
      } catch (error) {
        console.error('Error parsing amenities:', error);
        amenitiesArray = [];
      }
    }
    
    setEditForm({
      title: listing.title || '',
      location: listing.location || '',
      price: listing.price || '',
      bedrooms: listing.bedrooms || '',
      bathrooms: listing.bathrooms || '',
      size: listing.size || '',
      description: listing.description || '',
      availableFrom: listing.available_from || '',
      amenities: Array.isArray(amenitiesArray) ? amenitiesArray : [],
      status: listing.status || 'available',
      contact_name: listing.contact_name || '',
      contact_phone: listing.contact_phone || ''
    });
    setEditModalOpen(true);
  };

  const handleDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://stayspot.onrender.com/api/rentals/${listingId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Listing deleted successfully');
        fetchUserListings();
      } catch (error) {
        console.error('Error deleting listing:', error);
        toast.error('Failed to delete listing');
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://stayspot.onrender.com/api/rentals/${selectedListing.id}`, editForm, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Listing updated successfully');
      setEditModalOpen(false);
      fetchUserListings();
    } catch (error) {
      console.error('Error updating listing:', error);
      toast.error('Failed to update listing');
    }
  };

  const addAmenity = () => {
    setEditForm(prev => ({
      ...prev,
      amenities: [...prev.amenities, '']
    }));
  };

  const updateAmenity = (index, value) => {
    setEditForm(prev => ({
      ...prev,
      amenities: prev.amenities.map((amenity, i) => i === index ? value : amenity)
    }));
  };

  const removeAmenity = (index) => {
    setEditForm(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] py-8 px-2 md:px-8 mt-8">
        <div className="listings-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading your listings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-8 px-2 md:px-8 mt-8">
      <div className="listings-container">
        <div className="listings-header">
          <h2>Your Listings</h2>
          <Link to="/post-rental" className="add-listing-btn">
            Add New Listing
          </Link>
        </div>

        {listings.length === 0 ? (
          <div className="no-listings">
            <p>You haven't posted any rentals yet.</p>
            <Link to="/post-rental" className="add-listing-btn">
              Post Your First Rental
            </Link>
          </div>
        ) : (
          <div className="listings-grid">
            {listings.map((listing) => (
              <div key={listing.id} className="listing-card">
                <div className="listing-image">
                  <img src={listing.imageUrl} alt={listing.title} />
                  <div className="listing-status">
                    <span className={`status-badge ${listing.status}`}>
                      {listing.status}
                    </span>
                  </div>
                </div>
                <div className="listing-content">
                  <h3>{listing.title}</h3>
                  <p className="location">{listing.location}</p>
                  <p className="price">₹{listing.price}</p>
                  <div className="specs">
                    <span>{listing.bedrooms} Bedrooms</span>
                    <span>{listing.bathrooms} Bathrooms</span>
                    <span>{listing.size}</span>
                  </div>
                  <div className="listing-actions">
                    <Link 
                      to={`/rental/details/${listing.id}`} 
                      className="action-btn view-btn"
                    >
                      <FaEye /> View
                    </Link>
                    <button 
                      onClick={() => handleEdit(listing)} 
                      className="action-btn edit-btn"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(listing.id)} 
                      className="action-btn delete-btn"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Edit Modal should be outside listings-container */}
      <Modal
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        className="edit-modal"
        overlayClassName="edit-modal-overlay"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3>Edit Listing</h3>
            <button 
              onClick={() => setEditModalOpen(false)}
              className="close-btn"
            >
              ×
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={editForm.location}
                onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Size</label>
                <input
                  type="text"
                  value={editForm.size}
                  onChange={(e) => setEditForm(prev => ({ ...prev, size: e.target.value }))}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Bedrooms</label>
                <input
                  type="number"
                  value={editForm.bedrooms}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bedrooms: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Bathrooms</label>
                <input
                  type="number"
                  value={editForm.bathrooms}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bathrooms: e.target.value }))}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>
            <div className="form-group">
              <label>Available From</label>
              <input
                type="date"
                value={editForm.availableFrom}
                onChange={(e) => setEditForm(prev => ({ ...prev, availableFrom: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={editForm.status}
                onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="maintenance">Under Maintenance</option>
              </select>
            </div>
            <div className="form-group">
              <label>Contact Name</label>
              <input
                type="text"
                value={editForm.contact_name}
                onChange={(e) => setEditForm(prev => ({ ...prev, contact_name: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Contact Phone</label>
              <input
                type="tel"
                value={editForm.contact_phone}
                onChange={(e) => setEditForm(prev => ({ ...prev, contact_phone: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Amenities</label>
              {editForm.amenities.map((amenity, index) => (
                <div key={index} className="amenity-input">
                  <input
                    type="text"
                    value={amenity}
                    onChange={(e) => updateAmenity(index, e.target.value)}
                    placeholder="Enter amenity"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeAmenity(index)}
                    className="remove-amenity-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={addAmenity}
                className="add-amenity-btn"
              >
                + Add Amenity
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={() => setEditModalOpen(false)} className="cancel-btn">
              Cancel
            </button>
            <button onClick={handleUpdate} className="save-btn">
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default YourListings; 