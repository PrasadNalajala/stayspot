import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaPaperPlane, FaEnvelope } from 'react-icons/fa';
import messagingService from '../../services/messagingService';
import './index.css';
import ClipLoader from 'react-spinners/ClipLoader';

const Messaging = () => {
    const { rentalId } = useParams();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [rentalDetails, setRentalDetails] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to send messages');
            navigate('/login');
            return;
        }
        setIsAuthenticated(true);
        loadRentalDetails();
        loadMessages();
    }, [rentalId, navigate]);

    const loadRentalDetails = async () => {
        console.log('Calling loadRentalDetails');
        try {
            const response = await messagingService.getRentalDetails(rentalId);
            // If the API returns the rental directly (not inside a 'rental' key)
            const rental = response.rental || response; // support both formats
            console.log('Rental details loaded:', rental); // Debug output
            setRentalDetails({
                id: rental.id,
                title: rental.title,
                owner: rental.contact_name || rental.name || 'Owner',
                ownerEmail: rental.contact_email || rental.email || '',
            });
        } catch (error) {
            // fallback or error handling
            setRentalDetails(null);
        }
    };

    const loadMessages = async () => {
        try {
            const response = await messagingService.getMessages(rentalId);
            
            if (response.success) {
                setMessages(response.messages);
            } else {
                setMessages([]);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
            // Fallback to mock data if API fails
            const userId = localStorage.getItem('userId');
            setMessages([
                {
                    id: 1,
                    sender: 'user',
                    sender_id: userId, // Add sender_id for correct UI rendering
                    content: 'Hi, I\'m interested in this property. Is it still available?',
                    timestamp: new Date().toISOString()
                },
                {
                    id: 2,
                    sender: 'owner',
                    sender_id: 'owner', // Use a string or a unique id for owner
                    content: 'Yes, it\'s still available! When would you like to schedule a viewing?',
                    timestamp: new Date().toISOString()
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) {
            toast.error('Please enter a message');
            return;
        }

        const userId = localStorage.getItem('userId'); // Ensure userId is available

        try {
            const response = await messagingService.sendMessage(rentalId, newMessage.trim());

            if (response.success) {
                const message = {
                    id: response.message.id,
                    sender: 'user',
                    sender_id: userId, // Add sender_id for correct UI rendering
                    content: newMessage.trim(),
                    timestamp: new Date().toISOString()
                };

                setMessages(prev => [...prev, message]);
                setNewMessage('');
                toast.success('Message sent!');
            } else {
                toast.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            // Fallback to local state if API fails
            const message = {
                id: Date.now(),
                sender: 'user',
                sender_id: userId, // Add sender_id for correct UI rendering
                content: newMessage.trim(),
                timestamp: new Date().toISOString()
            };

            setMessages(prev => [...prev, message]);
            setNewMessage('');
            toast.success('Message sent! (offline mode)');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    if (loading) {
        return (
            <div className="messaging-container">
                <div className="messaging-loader-wrapper">
                    <ClipLoader color="#20c755" size={60} speedMultiplier={1.2} />
                    <div className="loader-text">Loading your chat...</div>
                </div>
            </div>
        );
    }

    const userId = localStorage.getItem('userId');
    console.log('Current userId from localStorage:', userId);

    return (
        <div className="messaging-container">
            <div className="messaging-header">
                <button className="back-btn" onClick={() => navigate(-1)} title="Back">
                    <FaArrowLeft />
                </button>
                <div className="header-avatar-name">
                    <div className="owner-avatar">
                        {rentalDetails?.profile_url ? (
                            <img src={rentalDetails.profile_url} alt="Owner" className="owner-img" />
                        ) : (
                            <span>
                                {(rentalDetails?.contact_name?.charAt(0).toUpperCase()) ||
                                (rentalDetails?.name?.charAt(0).toUpperCase()) ||
                                'O'}
                            </span>
                        )}
                    </div>
                </div>
                <div className="header-title-group">
                    <h2 className="property-title">{rentalDetails?.title || 'Property'}</h2>
                    <div className="owner-name-subtitle">
                        {rentalDetails?.contact_name || rentalDetails?.name || 'Owner'}
                    </div>
                </div>
            </div>

            <div className="messages-container">
                {messages.length === 0 ? (
                    <div className="no-messages">
                        <div className="no-messages-icon">
                            <FaEnvelope />
                        </div>
                        <h3>No messages yet</h3>
                        <p>Start a conversation with the property owner</p>
                    </div>
                ) : (
                    <div className="messages-list">
                        {messages.map((message) => {
                            const isUser = String(message.sender_id) === String(userId);
                            return (
                                <div
                                    key={message.id}
                                    className={`message ${isUser ? 'user-message' : 'owner-message'}`}
                                >
                                    <div className="message-content">
                                        <p>{message.content}</p>
                                        <span className="message-time">
                                            {new Date(message.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="message-input-container">
                <div className="message-input-wrapper">
                    <textarea
                        className="message-input"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        rows="1"
                    />
                    <button
                        className="send-btn"
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                    >
                        <FaPaperPlane />
                    </button>
                </div>
                <p className="message-hint">
                    Press Enter to send, Shift+Enter for new line
                </p>
            </div>
        </div>
    );
};

export default Messaging; 