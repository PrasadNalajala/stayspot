import './index.css';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaHeart, FaRegHeart } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import {FiPhoneOutgoing} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

const RentalItem = (props) => {
    const { itemDetails } = props;
    const { title, location, price, bedrooms, bathrooms, size, imageUrl, contact_email,contact_name,contact_phone,id } = itemDetails;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        // Check if this rental is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.id === id));
    }, [id]);

    const toggleFavorite = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to save favorites');
            return;
        }

        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        if (isFavorite) {
            // Remove from favorites
            const updatedFavorites = favorites.filter(fav => fav.id !== id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
            toast.success('Removed from favorites');
        } else {
            // Add to favorites
            const newFavorite = {
                id,
                title,
                location,
                price,
                bedrooms,
                bathrooms,
                size,
                imageUrl
            };
            const updatedFavorites = [...favorites, newFavorite];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(true);
            toast.success('Added to favorites');
        }
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%', 
            border:'none',
            backgroundColor: '#141414',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
    };

    return (
        <div className='rental-item'>
            <div className='rental-image-container'>
                <img className='rental-img' src={imageUrl} alt={title} />
                <button 
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={toggleFavorite}
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button>
            </div>
            <div className='rental-details'>
                <div className='rental-heading-container'>
                    <h1 className="rental-item-heading">{title}</h1>
                    <p className='rental-price'>{price}</p>
                </div>
                <div className='specifications-container'>
                    <p>{bedrooms} Bedrooms</p>
                    <p>{bathrooms} Bathrooms</p>
                    <p>{size}</p>
                </div>
                <div className='location-container'>
                    <p className='location'><FaMapMarkedAlt className='map-icon' />{location}</p>
                </div>
                <div className='button-container'>
                    <Link to={`/rental/details/${id}`} className='view-details-btn button' style={{textDecoration:'none'}}>
                    View Details
                    </Link>
                    <Link to={`/message/${id}`} className='message-btn button' style={{textDecoration:'none'}}>
                    Message Owner
                    </Link>
                    <button className='contact-btn button' onClick={openModal} style={{fontSize:'15px'}}>Owner Details</button>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Owner Details Modal"
            >
                <div className='modal-header'>
                    <h2>Owner Details</h2>
                    <button className='close-modal-btn' onClick={closeModal}>Close</button>
                </div>
                <div className='owner-details'>
                    <p><strong>Name:</strong> <span style={{textDecoration:'none',color:'#20c755'}}>{contact_name}</span></p>
                    <p><strong>Email:</strong> <a style={{textDecoration:'none',color:'#20c755'}}href={`mailto:${contact_email}`}>{contact_email}</a></p>
                    <p><strong>Phone:</strong><a style={{textDecoration:'none',color:'#20c755'}} href={`tel:${contact_phone}`}>{contact_phone}</a> </p>
                </div>
            </Modal>
        </div>
    );
};

export default RentalItem;
