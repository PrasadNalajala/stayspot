import React, { useState, useEffect } from 'react';
// import './index.css'; // Removed custom CSS
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';
import { FaUserCircle, FaBed, FaBath, FaRuler, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { MdLocationOn, MdDescription } from 'react-icons/md';
import Loader from '../Loader';
import { formatDistanceToNow } from 'date-fns';
import { createOrGetConversation } from '../../services/messagingService';
import { useNavigate } from 'react-router-dom';

const RentalDetails = () => {
    const { id } = useParams();
    const [rentalData, setRentalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [availableFrom, setAvailbleFrom] = useState('');
    const [description, setDescription] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [size, setSize] = useState('');
    const [status, setStatus] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [owner, setOwner] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const [images, setImages] = useState([]);
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
                const data = response.data;
                setTitle(data.title);
                images.push(data.imageUrl);
                setLocation(data.location);
                setPrice(data.price);
                setDescription(data.description);
                setBathrooms(data.bathrooms);
                setBedrooms(data.bedrooms);
                setSize(data.size);
                setAvailbleFrom(data.available_from);
                setPhone(data.contact_phone);
                setEmail(data.contact_email);
                setOwner(data.name);
                setStatus(data.status);
                setProfileUrl(data.profile_url);
                setImageUrl(data.imageUrl);
            } catch (err) {
                console.error("Error fetching rental details:", err);
                toast.error(err.message);
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
                setComments([...comments, { comment: newComment.trim(), created_at: new Date(), name: "You" }]);
                setNewComment("");
            } catch (err) {
                console.error("Error posting comment:", err);
                toast.error(err.message);
            }
        }
    };

    const profileIcon = profileUrl !== null ? (
        <img src={profileUrl} alt="Profile" className="w-16 h-16 rounded-full object-cover border-4 border-yellow-400 shadow" />
    ) : (
        <div className="w-16 h-16 rounded-full bg-[#20c755] text-[#232526] flex items-center justify-center text-2xl font-bold shadow">
            {owner.charAt(0).toUpperCase()}
        </div>
    );
    const available_from_date = new Date(availableFrom);
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
        const firstMessage = window.prompt('Type your message to the owner:');
        if (!firstMessage || !firstMessage.trim()) {
            toast.error('Message cannot be empty');
            return;
        }
        try {
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

    // Status badge color
    let statusColor = "bg-gradient-to-r from-[#232526] to-[#20c75522] text-[#20e37d] border border-[#20e37d] font-bold shadow";
    if (status.toLowerCase() === "available") statusColor = "bg-gradient-to-r from-[#20e37d] to-[#b2ffe7] text-[#181c1a] border border-[#20e37d] font-bold shadow";
    if (status.toLowerCase() === "rented") statusColor = "bg-gradient-to-r from-[#ffd700] to-[#ffe066] text-[#232526] border border-[#ffd700] font-bold shadow";
    if (status.toLowerCase() === "maintenance") statusColor = "bg-gradient-to-r from-[#dc3545] to-[#ffb3b3] text-white border border-[#dc3545] font-bold shadow";

    return (
        <>
            {!loading ? (
                <div className="min-h-screen bg-[#0a0a0a] py-8 px-2 md:px-8 flex flex-col gap-8 mt-24 pt-16 relative">
                    {/* Back Button */}
                    <button
                        className="fixed top-24 left-6 bg-[#101c13] hover:bg-[#20c755] transition-colors rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-50"
                        onClick={() => window.history.back()}
                        title="Back"
                    >
                        <svg width="28" height="28" fill="none" stroke="#20c755" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <div className="flex flex-col md:flex-row gap-8 rounded-2xl shadow-xl p-6">
                        <div className="relative w-full md:w-1/2 h-72 md:h-[500px] rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10 rounded-2xl" />
                            <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-2xl z-0" />
                        </div>
                        <div className="flex-1 flex flex-col gap-4">
                            <h1 className="text-3xl md:text-4xl font-bold text-green-400 drop-shadow mb-1">{title}</h1>
                            <p className="flex items-center gap-2 text-blue-300 text-lg font-medium">
                                <MdLocationOn className="text-blue-400 text-xl" /> {location}
                            </p>
                            <p className="text-2xl font-extrabold text-yellow-400 drop-shadow mb-2">₹{price}/month</p>
                            <div className="flex flex-wrap gap-4 my-2">
                                <span className="flex items-center gap-2 border border-[#20c75522] shadow-lg bg-[#181c1a] rounded-xl px-6 py-4 text-green-300 font-semibold">
                                    <FaBed className="text-green-400" />
                                    <span className="text-white font-bold">{bedrooms}</span>
                                    <span className="text-gray-300 font-normal">Bedrooms</span>
                                </span>
                                <span className="flex items-center gap-2 border border-[#20c75522] shadow-lg bg-[#181c1a] rounded-xl px-6 py-4 text-blue-300 font-semibold">
                                    <FaBath className="text-blue-400" />
                                    <span className="text-white font-bold">{bathrooms}</span>
                                    <span className="text-gray-300 font-normal">Bathrooms</span>
                                </span>
                                <span className="flex items-center gap-2 border border-[#20c75522] shadow-lg bg-[#181c1a] rounded-xl px-6 py-4 text-purple-300 font-semibold">
                                    <FaRuler className="text-purple-400" />
                                    <span className="text-white font-bold">{size}</span>
                                </span>
                            </div>
                            <div className="rounded-xl p-6 shadow border border-[#20c75522] flex flex-col gap-4 bg-transparent mt-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <MdDescription className="text-cyan-400 text-2xl" />
                                    <h2 className="text-xl font-bold text-cyan-300">Description</h2>
                                </div>
                                <p className="text-gray-200 text-lg">{description}</p>
                                <div className="flex flex-wrap gap-8 mt-2">
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-yellow-400" />
                                        <span className="text-gray-400 font-medium">Available From:</span>
                                        <span className="font-semibold text-white">{formattedDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaCheckCircle className="text-green-400" />
                                        <span className="text-gray-400 font-medium">Status:</span>
                                        <span className={`inline-block px-3 py-1 rounded-full ml-2 ${statusColor}`}>{status}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-[#20c75522]">
                        <div className="flex items-center gap-4 rounded-xl p-4 shadow border border-[#20c75522]">
                            {profileIcon}
                            <div>
                                <p className="text-[#00ff9d] text-lg font-bold m-0" style={{textShadow:'0 0 10px rgba(0,255,157,0.2)'}}>{owner}</p>
                                <p className="text-[#b3b3b3] m-0">Property Owner</p>
                            </div>
                        </div>
                        {!isOwner && (
                            <button
                                className="self-end mt-2 px-6 py-2 bg-gradient-to-r from-[#00ff9d] to-[#00cc7e] hover:from-[#20e37d] hover:to-[#ffd700] text-[#232526] font-bold rounded-lg shadow transition"
                                onClick={handleMessageOwner}
                            >
                                Message Owner
                            </button>
                        )}
                    </div>

                    <div className="rounded-2xl shadow-xl p-6 mt-2 border border-[#20c75522]">
                        <h2 className="text-xl font-semibold text-cyan-300 mb-4">Comments</h2>
                        <div className="flex flex-col gap-4 border-t border-[#20c75522] pt-4">
                            {comments.length === 0 ? (
                                <p className="text-[#b3b3b3] italic">No comments yet. Be the first to comment! 🙋‍♂️</p>
                            ) : (
                                comments.map((comment, index) => (
                                    <div key={index} className="rounded-lg p-4 shadow flex flex-col gap-2 animate-fade-in border border-[#20c75522]">
                                        <div className="flex items-center gap-3">
                                            {comment.profile_url ? (
                                                <img src={comment.profile_url} alt={comment.name} className="w-10 h-10 rounded-full object-cover" />
                                            ) : (
                                                <FaUserCircle className="text-3xl text-gray-400" />
                                            )}
                                            <span className="font-bold text-[#20c755]">{comment.name}</span>
                                            <span className="text-xs text-[#b2ffb2]">{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                                        </div>
                                        <hr className="border-t border-[#20c75522] my-1" />
                                        <p className="text-gray-200 text-base text-left">{comment.comment}</p>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="flex flex-col gap-2 mt-6">
                            <textarea
                                className="w-full p-3 rounded-lg border-2 border-[#20c755] bg-[#181c1a] text-[#20c755] text-base resize-vertical min-h-[120px] focus:outline-none focus:border-[#00ff9d] focus:ring-2 focus:ring-[#20e37d] placeholder:text-[#666] font-medium"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button
                                className="self-end px-6 py-2 bg-[#20c755] text-[#232526] font-bold rounded-lg shadow transition hover:bg-gradient-to-r hover:from-[#20e37d] hover:to-[#ffd700] hover:text-[#181c1a]"
                                onClick={handlePostComment}
                            >
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
                    <Loader />
                </div>
            )}
        </>
    );
};

export default RentalDetails;
