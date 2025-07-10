import axios from 'axios';

const API_BASE_URL = 'https://stayspot.onrender.com/api';

// Configure axios defaults
axios.defaults.headers.common['Content-Type'] = 'application/json';

const messagingService = {
    // Get messages for a specific rental
    getMessages: async (rentalId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/messages/${rentalId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    },

    // Send a new message
    sendMessage: async (rentalId, content) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_BASE_URL}/messages/${rentalId}`, {
                content,
                rentalId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    },

    // Get rental details for messaging
    getRentalDetails: async (rentalId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_BASE_URL}/rental-details`, {
                rental_id: rentalId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching rental details:', error);
            throw error;
        }
    },

    // Get all conversations for the current user
    getConversations: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/conversations`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching conversations:', error);
            throw error;
        }
    }
};

export default messagingService; 