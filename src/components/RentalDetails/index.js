import React, { useState,useEffect } from 'react';
import './index.css';
import Navbar from '../Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import { FaUserCircle, FaBed, FaBath, FaRuler, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { MdLocationOn, MdDescription } from 'react-icons/md';
import Loader from '../Loader'
import { formatDistanceToNow } from 'date-fns';
import { createOrGetConversation } from '../../services/messagingService';
import { useNavigate } from 'react-router-dom';

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
    
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const navigate = useNavigate();

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

        const fetchComments = async () => {
            try {
                const response = await axios.get(`https://stayspot.onrender.com/api/rentals/${id}/comments`);
                setComments(response.data);
            } catch (err) {
                console.error("Error fetching comments:", err);
                toast.error(err.message);
            }
        };

        fetchRentalDetails();
        fetchComments();
    }, [id]);

    const handlePostComment = async () => {
        if (newComment.trim()) {
            try {
                const token = localStorage.getItem("token"); 
                await axios.post(`https://stayspot.onrender.com/api/rentals/${id}/comments`, {
                    comment: newComment.trim(),
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setComments([...comments, { comment: newComment.trim(), created_at: new Date(), name: "You",  }]); 
                setNewComment("");
            } catch (err) {
                console.error("Error posting comment:", err);
                toast.error(err.message);
            }
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

    const userId = localStorage.getItem('userId');
    const isOwner = rentalData && rentalData.user_id && String(rentalData.user_id) === String(userId);

    const handleMessageOwner = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to message the owner');
            navigate('/login');
            return;
        }
        // Prompt for the first message
        const firstMessage = window.prompt('Type your message to the owner:');
        if (!firstMessage || !firstMessage.trim()) {
            toast.error('Message cannot be empty');
            return;
        }
        try {
            // Step 1: Create or get conversation
            const convoRes = await fetch('https://stayspot.onrender.com/api/conversations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ rentalId: id })
            });
            const convoData = await convoRes.json();
            if (!convoData.conversation || !convoData.conversation.id) {
                toast.error('Could not start conversation');
                return;
            }
            const conversationId = convoData.conversation.id;
            // Step 2: Send the first message
            const msgRes = await fetch(`https://stayspot.onrender.com/api/conversations/${conversationId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ content: firstMessage.trim() })
            });
            const msgData = await msgRes.json();
            if (msgData.message === 'Message sent') {
                toast.success('Message sent!');
                navigate(`/messages/${conversationId}`, { state: { rentalId: id } });
            } else {
                toast.error('Failed to send message');
            }
        } catch (err) {
            toast.error('Could not start conversation');
        }
    };

    return (
        <>
            <Navbar />
            {!loading ? (
                <div className="rental-details-page">
                    <div className="rental-header-container">
                        <div className="rental-image-container">
                            <img src={imageUrl} alt={title} className="rental-image" />
                        </div>
                        <div className="rental-header">
                            <h1 className="rental-title">{title}</h1>
                            <p className="rental-location">
                                <MdLocationOn className="icon" /> {location}
                            </p>
                            <p className="rental-price">₹{price}/month</p>
                            <div className="rental-specs">
                                <span><FaBed className="icon" /> {bedrooms} Bedrooms</span>
                                <span><FaBath className="icon" /> {bathrooms} Bathrooms</span>
                                <span><FaRuler className="icon" /> {size}</span>
                            </div>
                            <div className="rental-description">
                                <h2><MdDescription className="icon" /> Description</h2>
                                <p className="description">{description}</p>
                                <p><FaCalendarAlt className="icon" /> Available From: <strong>{formattedDate}</strong></p>
                                <p><FaCheckCircle className="icon" /> Status: <strong>{status}</strong></p>
                            </div>
                        </div>
                    </div>

                    <div className="rental-details-info">
                        <div className="posted-by-section">
                            {profileIcon}
                            <div>
                                <p style={{ color: '#20c755', fontSize: '1.2rem', fontWeight: '600', margin: 0 }}>
                                    {owner}
                                </p>
                                <p style={{ color: '#a9a4a4', margin: '0.5rem 0 0 0' }}>
                                    Property Owner
                                </p>
                            </div>
                        </div>
                        {!isOwner && (
                            <button
                                className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow transition"
                                onClick={handleMessageOwner}
                            >
                                Message Owner
                            </button>
                        )}
                    </div>

                    <div className="comments-section">
                        <h2>Comments</h2>
                        <div className="comments-list">
                            {comments.length === 0 ? (
                                <p className="no-comments-message">
                                    No comments yet. Be the first to comment! 🙋‍♂️
                                </p>
                            ) : (
                                comments.map((comment, index) => (
                                    <div key={index} className="comment">
                                        <div className="comment-header">
                                            {comment.profile_url ? (
                                                <img src={comment.profile_url} alt={comment.name} className="comment-profile-pic" />
                                            ) : (
                                                <FaUserCircle className="default-user-icon" />
                                            )}
                                            <p className="comment-author">
                                                <strong>{comment.name}</strong>
                                            </p>
                                            <p className="comment-time">
                                                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                                            </p>
                                        </div>
                                        <p className="comment-text">{comment.comment}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="post-comment">
                            <textarea
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button onClick={handlePostComment}>Post Comment</button>
                        </div>
                    </div>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default RentalDetails;
