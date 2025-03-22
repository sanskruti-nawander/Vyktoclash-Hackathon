import React, { useState } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';
import { FaComments } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { IoSendSharp } from 'react-icons/io5';
import AiAvatar from '../assets/images/AI-avatar.png';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before fully closing
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 1000);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { user: input }]);
    setInput('');

    try {
      const response = await axios.post('http://localhost:3001/counseling', { input: input, context: messages, });

      setMessages((prev) => [...prev, { bot: response.data.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { bot: 'Some Error Occurred! Please Try Again' },
      ]);
    }
  };

  // Keyframe animations
  const keyframes = `
    @keyframes slideIn {
      from { transform: translateX(130%); }
      to { transform: translateX(0); }
    }
    @keyframes slideOut {
      from { transform: translateX(0); }
      to { transform: translateX(130%); }
    }
    @keyframes floatingSlideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;

  const styles = {
    floatingButton: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#007bff',
      color: '#fff',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      zIndex: 1000,
      animation: isClosing ? 'slideOut 1s forwards' : 'slideIn 1s forwards',
    },
    modalStyle: {
      position: 'fixed',
      bottom: '2%',
      right: '1%',
      width: '400px',
      height: '600px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      animation: isClosing ? 'slideOut 1s forwards' : 'slideIn 1s forwards',
      zIndex: 1001,
    },
    header: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
    },
    status: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    chatArea: {
      flexGrow: 1,
      padding: '1rem',
      overflowY: 'auto',
      backgroundColor: '#f9f9f9',
    },
    inputArea: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderTop: '1px solid #ddd',
      backgroundColor: '#fff',
    },
    input: {
      flexGrow: 1,
      padding: '15px',
      border: '1px solid #ccc',
      borderRadius: '25px',
      marginRight: '10px',
      outline: 'none',
      fontSize: '16px',
      height: '50px',
      width: '85%', // Increased width
    },
    sendButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px', // Reduced width
      padding: '0',
    },
    sendIcon: {
      color: '#0000FF',
      fontSize: '20px', // Slightly smaller icon
    },
    message: {
      marginBottom: '10px',
    },
    botMessage: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
    },
    userMessage: {
      textAlign: 'right',
    },
    messageBubble: {
      padding: '10px',
      borderRadius: '10px',
      maxWidth: '70%',
    },
    botBubble: {
      backgroundColor: '#f1f1f1',
    },
    userBubble: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
  };

  // If chatbot is not open, show the floating button
  if (!open) {
    return (
      <div>
        <style>{keyframes}</style>
        <div style={styles.floatingButton} onClick={handleOpen}>
          <FaComments size={30} />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Add keyframe styles to the document */}
      <style>{keyframes}</style>
      
      <div style={styles.modalStyle}>
        <div style={styles.header}>
          <Typography variant="h6">Chat with us</Typography>
          <div style={styles.status}>
            <span
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: 'green',
                borderRadius: '50%',
                display: 'inline-block',
              }}
            />
            <Typography>Online</Typography>
          </div>
          <AiOutlineClose 
            size={20} 
            style={{ cursor: 'pointer' }} 
            onClick={handleClose} 
          />
        </div>
        
        <div style={styles.chatArea}>
          {messages.map((msg, index) => (
            <div key={index} style={styles.message}>
              {msg.bot ? (
                <div style={{ ...styles.botMessage, ...styles.messageBubble, ...styles.botBubble }}>
                  <img src={AiAvatar} alt="Bot" style={{ width: '30px', borderRadius: '50%' }} />
                  <Typography>{msg.bot}</Typography>
                </div>
              ) : (
                <div
                  style={{
                    ...styles.userMessage,
                    ...styles.messageBubble,
                    ...styles.userBubble,
                  }}
                >
                  <Typography>{msg.user}</Typography>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div style={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            style={styles.input}
            placeholder="Type a message..."
          />
          <button 
            onClick={sendMessage} 
            style={styles.sendButton}
            disabled={!input.trim()}
          >
            <IoSendSharp style={{
              ...styles.sendIcon,
              opacity: input.trim() ? 1 : 0.3
            }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
