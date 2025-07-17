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

export async function fetchConversations(token, rentalId) {
  if (rentalId) {
    // Use POST to get or create a conversation for a specific rental
    const res = await fetch('https://stayspot.onrender.com/api/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ rentalId })
    });
    return res.json(); // { conversation: {...} }
  } else {
    // Use GET to fetch all conversations
    const res = await fetch('https://stayspot.onrender.com/api/conversations', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.json(); // { conversations: [...] }
  }
}

export async function createOrGetConversation(token, rentalId) {
  const res = await fetch('https://stayspot.onrender.com/api/conversations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ rentalId })
  });
  return res.json();
}

export async function fetchMessages(token, conversationId) {
  const res = await fetch(`https://stayspot.onrender.com/api/conversations/${conversationId}/messages`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}

export async function sendMessage(token, conversationId, content) {
  const res = await fetch(`https://stayspot.onrender.com/api/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });
  return res.json();
} 