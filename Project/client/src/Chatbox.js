import React, { useState } from 'react';
import './Chatbox.css'; // Create this CSS file for styling

const Chatbox = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userMessage = input;
        setMessages([...messages, { text: userMessage, type: 'user' }]);
        setInput('');

        // Call your backend API here
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        setMessages((prev) => [...prev, { text: data.reply, type: 'bot' }]);
    };

    return (
        <div className="chatbox">
            <textarea className="chat-input" placeholder="Type your message here..."></textarea>
            <button className="send-button">Send</button>
        </div>
    );
};

export default Chatbox;
