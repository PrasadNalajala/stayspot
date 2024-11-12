import './index.css';
import { FaMapMarkedAlt } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import {FiPhoneOutgoing} from 'react-icons/fi';
import { useState } from 'react';
import Modal from 'react-modal';

const RentalItem = (props) => {
    const { itemDetails } = props;
    const { title, location, price, bedrooms, bathrooms, size, imageUrl, contact } = itemDetails;
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

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
            <img className='rental-img' src={imageUrl} alt={title} />
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
                    <button className='view-details-btn button'>View Details</button>
                    <button className='contact-btn button' onClick={openModal}>Owner Details</button>
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
                    <p><strong>Name:</strong> <span style={{textDecoration:'none',color:'#20c755'}}>{contact.name}</span></p>
                    <p><strong>Email:</strong> <a style={{textDecoration:'none',color:'#20c755'}}href={`mailto:${contact.email}`}>{contact.email}</a></p>
                    <p><strong>Phone:</strong><a style={{textDecoration:'none',color:'#20c755'}} href={`tel:${contact.phone}`}>{contact.phone}</a> </p>
                </div>
            </Modal>
        </div>
    );
};

export default RentalItem;
