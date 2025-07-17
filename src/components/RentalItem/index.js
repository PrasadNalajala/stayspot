import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaMapMarkedAlt, FaHeart, FaRegHeart, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
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
    const navigate = useNavigate();

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
                    <Link to={`/rental/details/${id}`} className='view-details-btn button'>
                        View Details
                    </Link>
                    <button 
                        className='message-btn button'
                        onClick={async () => {
                            const token = localStorage.getItem('token');
                            if (!token) {
                                toast.error('Please login to send messages');
                                return;
                            }
                            try {
                                const response = await fetch('https://stayspot.onrender.com/api/conversations', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`
                                    },
                                    body: JSON.stringify({ rentalId: id })
                                });
                                const data = await response.json();
                                if (data.conversation && data.conversation.id) {
                                    navigate(`/messages/${data.conversation.id}`);
                                } else {
                                    toast.error('Could not start conversation');
                                }
                            } catch (err) {
                                toast.error('Could not start conversation');
                            }
                        }}
                    >
                        Message Owner
                    </button>
                    <button className='contact-btn button' onClick={openModal}>
                        Owner Details
                    </button>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="owner-details-modal"
                overlayClassName="owner-details-modal-overlay"
                contentLabel="Owner Details Modal"
            >
                <div className='modal-header'>
                    <h2>Owner Details</h2>
                    <button className='close-modal-btn' onClick={closeModal}>Close</button>
                </div>
                <div className='owner-details'>
                    <div className='owner-detail-item'>
                        <div className='detail-icon'>
                            <FaUser />
                        </div>
                        <div className='detail-content'>
                            <span className='detail-label'>Name</span>
                            <span className='owner-info'>{contact_name}</span>
                        </div>
                    </div>
                    <div className='owner-detail-item'>
                        <div className='detail-icon'>
                            <FaEnvelope />
                        </div>
                        <div className='detail-content'>
                            <span className='detail-label'>Email</span>
                            <a className='owner-info' href={`mailto:${contact_email}`}>{contact_email}</a>
                        </div>
                    </div>
                    <div className='owner-detail-item'>
                        <div className='detail-icon'>
                            <FaPhone />
                        </div>
                        <div className='detail-content'>
                            <span className='detail-label'>Phone</span>
                            <a className='owner-info' href={`tel:${contact_phone}`}>{contact_phone}</a>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default RentalItem;
