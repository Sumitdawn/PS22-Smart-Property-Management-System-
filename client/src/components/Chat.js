import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [room, setRoom] = useState('general');
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.emit('join-room', room);

    newSocket.on('receive-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => newSocket.close();
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      socket.emit('send-message', {
        message: newMessage,
        user: user.name,
        room: room
      });
      setNewMessage('');
    }
  };

  const changeRoom = (newRoom) => {
    setRoom(newRoom);
    setMessages([]);
    if (socket) {
      socket.emit('join-room', newRoom);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Real-time Chat</h3>
        <div className="room-selector">
          <button 
            className={room === 'general' ? 'active' : ''}
            onClick={() => changeRoom('general')}
          >
            General
          </button>
          <button 
            className={room === 'tech' ? 'active' : ''}
            onClick={() => changeRoom('tech')}
          >
            Tech Talk
          </button>
          <button 
            className={room === 'random' ? 'active' : ''}
            onClick={() => changeRoom('random')}
          >
            Random
          </button>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <div className="message-header">
              <strong>{msg.user}</strong>
              <span className="timestamp">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="message-content">{msg.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;