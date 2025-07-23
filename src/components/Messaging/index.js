import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft, FaPaperPlane, FaEnvelope } from "react-icons/fa";
import { BsCheck, BsCheckAll } from 'react-icons/bs';
import {
  fetchMessages,
  sendMessage,
  fetchConversations,
} from "../../services/messagingService";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

const Messaging = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const [conversationIdState, setConversationIdState] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initializeMessaging = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to send messages");
        navigate("/login");
        return;
      }
      setIsAuthenticated(true);

      // Get userId from localStorage or fetch from API
      let currentUserId = localStorage.getItem("userId");
      if (!currentUserId) {
        try {
          const profileRes = await axios.get(
            "https://stayspot.onrender.com/api/user",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Handle different response formats
          let userData = null;
          if (Array.isArray(profileRes.data) && profileRes.data.length > 0) {
            userData = profileRes.data[0];
          } else if (profileRes.data && typeof profileRes.data === "object") {
            userData = profileRes.data;
          }

          if (userData && userData.id) {
            currentUserId = userData.id;
            localStorage.setItem("userId", currentUserId);
          }
        } catch (profileErr) {
          console.error("Failed to fetch user profile:", profileErr);
        }
      }
      setUserId(currentUserId);
      await loadConversation();
    };

    initializeMessaging();
  }, [navigate, location]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const loadConversation = async () => {
    const token = localStorage.getItem("token");
    // Get rentalId from navigation state if available
    let rentalId = location.state?.rentalId || null;
    // If you have a conversationId (from the URL), do NOT POST to /api/conversations
    if (conversationId) {
      // Use GET to fetch all conversations and find the one with this ID
      const res = await fetchConversations(token);
      if (res.conversations) {
        const conv = res.conversations.find(
          (c) => String(c.id) === String(conversationId)
        );
        setConversation(conv || null);
        if (conv && conv.id) {
          const correctConversationId = String(conv.id);
          setConversationIdState(correctConversationId);
          // Load messages with the correct conversation ID
          await loadMessages(correctConversationId);
        }
      }
      return;
    }

    if (rentalId) {
      const res = await fetchConversations(token, rentalId);
      if (res.conversation) {
        setConversation(res.conversation);
        const correctConversationId = String(res.conversation.id);
        setConversationIdState(correctConversationId);
        await loadMessages(correctConversationId);
        return;
      }
    }
    // Fallback: GET all conversations
    const res = await fetchConversations(token);
    if (res.conversations) {
      const conv = res.conversations.find(
        (c) => String(c.id) === String(conversationId)
      );
      setConversation(conv || null);
      if (conv && conv.id) {
        const correctConversationId = String(conv.id);
        setConversationIdState(correctConversationId);
        await loadMessages(correctConversationId);
      }
    }
  };

  const loadMessages = async (conversationIdToUse = conversationIdState) => {
    if (!conversationIdToUse) {
      return;
    }
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://stayspot.onrender.com/api/conversations/${conversationIdToUse}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.messages) {
        setMessages(response.data.messages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://stayspot.onrender.com/api/conversations/${conversationIdState}/messages`,
        {
          content: newMessage.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.message === "Message sent") {
        setNewMessage("");
        // Instead of calling loadMessages (which sets loading), fetch messages directly without setting loading
        try {
          const res = await axios.get(
            `https://stayspot.onrender.com/api/conversations/${conversationIdState}/messages`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (res.data && res.data.messages) {
            setMessages(res.data.messages);
          }
        } catch (error) {
          // Optionally handle error
        }
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isThisYear = date.getFullYear() === now.getFullYear();
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
  
    if (isToday) return time;
    if (isThisYear) return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${time}`;
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}, ${time}`;
  };
  

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <ClipLoader color="#20c755" size={60} speedMultiplier={1.2} />
        <div className="ml-4 text-lg">Loading your chat...</div>
      </div>
    );
  }

  // Determine the name of the person you are chatting with
  let chatPartnerName = "";
  if (conversation) {
    if (String(conversation.owner_id) === String(userId)) {
      chatPartnerName = conversation.user_name || "";
    } else if (String(conversation.user_id) === String(userId)) {
      chatPartnerName = conversation.owner_name || "";
    } else {
      chatPartnerName = conversation.owner_name || conversation.user_name || "";
    }
  }

  // Restore the previous chat UI structure
  return (
    <div className="min-h-[80vh] py-8 px-2 md:px-8 mt-8">
      <div className="max-w-2xl mx-auto flex flex-col h-[80vh] bg-black rounded-lg shadow p-0 md:p-4 mt-16">
        {/* Header */}
        <div className="flex items-center border-b px-4 py-3">
          <button
            className="mr-4 text-gray-400 hover:text-gray-200"
            onClick={() => navigate(-1)}
            title="Back"
          >
            <FaArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <div className="font-bold text-lg text-white">
              {chatPartnerName || "Chat"}
            </div>
            <div className="text-gray-400 text-sm">
              {conversation?.rental_title || conversation?.rental?.title || ""}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 bg-black">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FaEnvelope size={40} className="mb-2" />
              <h3 className="text-lg font-semibold mb-1">No messages yet</h3>
              <p>Start a conversation</p>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              {messages.map((message, idx) => {
                const isUser = String(message.sender_id) === String(userId);

                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-xs break-words shadow text-sm ${
                        isUser
                          ? "bg-green-600 text-white text-right"
                          : "bg-neutral-900 border text-white text-left"
                      }`}
                    >
                      <p>{message.content}</p>

                      {/* Timestamp */}
                      <span className="block text-xs text-gray-400 mt-1">
                        {formatMessageTime(message.timestamp)}
                      </span>

                      {isUser && (
                        <span className="flex justify-end items-center text-xs mt-1 space-x-1">
                            {message.is_read ? (
                            <BsCheckAll className="text-blue-500 text-sm" title="Seen" />
                            ) : (
                            <BsCheckAll className="text-gray-400 text-sm" title="Delivered" />
                            )}
                        </span>
                        )}

                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="border-t px-4 py-3 bg-black flex items-center"
        >
          <textarea
            className="flex-1 resize-none border rounded-lg px-3 py-2 mr-2 focus:outline-none focus:ring focus:border-green-400 text-sm bg-neutral-900 text-white placeholder-gray-500"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={1}
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 transition disabled:opacity-50"
            title="Send"
            disabled={!newMessage.trim()}
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messaging;
