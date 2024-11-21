import React, { useState,useEffect } from 'react';
import './index.css';
import Navbar from '../Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

// #ToDo
// imageUrls
// UI
// Amenties
// RentalsSpecs
const RentalDetails = () => {
    const { id } = useParams();
    const [rentalData, setRentalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title,setTitle]=useState('')
    const [imageUrl,setImageUrl]=useState('')
    const [location,setLocation]=useState('')
    const [price,setPrice]=useState('')
    const [availableFrom,setAvailbleFrom]=useState('')
    const [description,setDescription]=useState('')
    const [bedrooms,setBedrooms]=useState('')
    const [bathrooms,setBathrooms]=useState('')
    const [size,setSize]=useState('')
    const [status,setStatus]=useState('')
    const [phone,setPhone]=useState('')
    const [email,setEmail]=useState('')
    const [owner,setOwner]=useState('')
    const [profileUrl,setProfileUrl]=useState('')
    const [images,setImages]=useState([])
    
    useEffect(() => {
        const fetchRentalDetails = async () => {
            try {
                const response = await axios.post("https://stayspot.onrender.com/api/rental-details", {
                    rental_id: id,
                });
                setRentalData(response.data);
                const data=response.data
                setTitle(data.title)
                images.push(data.imageUrl)
                setLocation(data.location)
                setPrice(data.price)
                setDescription(data.description)
                setBathrooms(data.bathrooms)
                setBedrooms(data.bedrooms)
                setSize(data.size)
                setAvailbleFrom(data.available_from)
                setPhone(data.contact_phone)
                setEmail(data.contact_email)
                setOwner(data.name)
                setStatus(data.status)
                setProfileUrl(data.profile_url)
                setImageUrl(data.imageUrl)
            } catch (err) {
                console.error("Error fetching rental details:", err);
                toast.error(err.message)
            } finally {
                setLoading(false);
            }
        };

        fetchRentalDetails();
    }, [id]);


    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const handlePostComment = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment.trim()]);
            setNewComment("");
        }
    };
    const profileIcon = profileUrl!==null? (
        <img src={profileUrl} alt="Profile" className="owner-profile-pic" />
      ) : (
        <div className="profile-placeholder">
           {owner.charAt(0).toUpperCase()}
        </div>
      );
    const available_from_date=new Date(availableFrom)
    const formattedDate = available_from_date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    return (
        <>
            <Navbar />
            {!loading?
            
            <div className="rental-details-page">
                <div className="rental-header-container">
                    <div className="rental-image-container">
                        {images??images.length > 1 ? (
                            <Swiper spaceBetween={10} slidesPerView={1} loop>
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={imageUrl} alt={title} className="rental-image" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <img src={imageUrl} alt={title} className="rental-image" />
                        )}
                    </div>
                    <div className="rental-header">
                        <h1 className="rental-title">{title}</h1>
                        <p className="rental-location">{location}</p>
                        <p className="rental-price">{price}</p>
                        <div className="rental-specs">
                            <span>{bedrooms} Bedrooms</span>
                            <span>{bathrooms} Bathrooms</span>
                            <span>{size}</span>
                        </div>
                        <div className="rental-description">
                        <h2>Description</h2>
                        <p className='description'> {description}</p>
                        <p>Available From: <strong>{formattedDate}</strong></p>
                        <p>Status: <strong>{status}</strong></p>
                    </div>
                    </div>
                </div>

                <div className="rental-details-info">
                    <div className="posted-by-section">
                        <div style={{display:'flex',alignItems:'center',gap:'8px',paddingLeft:'7px'}}>
                        {profileIcon}
                        <p style={{color:'#20c755',fontFamily:'serif',fontSize:'22px'}}> {owner}</p>
                        </div>

                    </div>
                    
                </div>

                <div className="comments-section">
                    <h2>Comments</h2>
                    <div className="comments-list">
                        {comments.length === 0 ? (
                            <p>No comments yet. Be the first to comment!🙋‍♂️</p>
                        ) : (
                            comments.map((comment, index) => (
                                <div key={index} className="comment">
                                    <p>{comment}</p>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="post-comment">
                        <textarea
                            placeholder="Write a comment..."
                            value={newComment}
                            style={{backgroundColor:'#101010',color:'#ffffff'}}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={handlePostComment}>Post Comment</button>
                    </div>
                </div>
            </div> 
           : <p>Loading...</p>
}
        </>
    );
};

export default RentalDetails;
