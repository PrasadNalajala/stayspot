import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchConversations } from '../../services/messagingService';
import { HiChevronRight, HiPlus } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';

const getInitials = (name) => {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0][0];
  return parts[0][0] + parts[parts.length - 1][0];
};

const formatDateOrTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  return isToday
    ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : date.toLocaleDateString();
};

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    fetchConversations(token).then(res => {
      if (res.conversations) {
        setConversations(res.conversations);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64 text-lg text-white">Loading conversations...</div>;

  if (!conversations.length) {
    return <div className="flex justify-center items-center h-64 text-gray-400">No conversations yet.</div>;
  }

  const userId = localStorage.getItem('userId');

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-[#181818] to-[#232526] pt-24 pb-24 px-2 relative">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-white tracking-tight drop-shadow-lg">Your Conversations</h2>
      <div className="flex flex-col w-full max-w-2xl mx-auto divide-y divide-[#232526] bg-[#181818] rounded-2xl shadow-2xl">
        {conversations.map((convo, idx) => {
          let chatPartnerName = '';
          if (String(convo.owner_id) === String(userId)) {
            chatPartnerName = convo.user_name || '';
          } else if (String(convo.user_id) === String(userId)) {
            chatPartnerName = convo.owner_name || '';
          } else {
            chatPartnerName = convo.owner_name || convo.user_name || '';
          }
          const avatarUrl = convo.user_profile_url || convo.owner_profile_url || convo.rental_imageUrl || null;
          const initials = getInitials(chatPartnerName);
          const lastMsg = convo.last_message || '';
          const lastMsgSenderId = convo.last_message_sender_id;
          const lastMsgTime = formatDateOrTime(convo.last_message_time);
          const isLastMsgByUser = String(lastMsgSenderId) === String(userId);
          const unread = convo.unread_count && convo.unread_count > 0;
          return (
            <div
              key={convo.id}
              className={`flex items-center group cursor-pointer px-5 py-6 transition w-full bg-[#202325] hover:bg-[#232526] ${idx === 0 ? 'rounded-t-2xl' : ''} ${idx === conversations.length-1 ? 'rounded-b-2xl' : ''} shadow-md hover:shadow-green-400/10 border border-[#232526] hover:border-green-300/60`}
              onClick={() => navigate(`/messages/${convo.id}`)}
            >
              <div className="relative w-14 h-14 flex-shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center mr-5 border-2 border-green-500 shadow group-hover:border-green-300 group-hover:ring-1 group-hover:ring-green-300/30 transition-all duration-200">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="object-cover w-full h-full" />
                ) : initials ? (
                  <span className="text-2xl font-bold text-white">{initials}</span>
                ) : (
                  <FaUserCircle className="text-4xl text-white/80" />
                )}
                {unread && <span className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#181818] animate-pulse"></span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-lg text-white truncate group-hover:text-green-400 transition">{chatPartnerName}</span>
                  {lastMsgTime && <span className="text-xs text-gray-400 ml-2 whitespace-nowrap font-mono">{lastMsgTime}</span>}
                </div>
                <div className="text-green-400 text-xs truncate font-medium mb-0.5 opacity-80">{convo.rental_title || convo.rental?.title}</div>
                {lastMsg && (
                  <div className="text-gray-300 text-sm truncate mt-0.5 italic flex items-center gap-1 group-hover:bg-green-400/5 px-1 py-0.5 rounded transition-all">
                    {isLastMsgByUser && <span className="font-bold text-green-400 not-italic">You:</span>}
                    <span>{lastMsg}</span>
                  </div>
                )}
              </div>
              <HiChevronRight className="ml-4 text-3xl text-gray-500 group-hover:text-green-400 transition" />
            </div>
          );
        })}
      </div>
      {/* Floating New Chat Button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl border-4 border-[#181818] transition-all duration-200 hover:scale-110"
        title="Start New Chat"
        onClick={() => navigate('/browse')}
      >
        <HiPlus className="text-4xl" />
      </button>
    </div>
  );
};

export default ConversationList; 