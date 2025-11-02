import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ChatBox.css";

export default function ChatBox({ senderEmail, receiverEmail, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [senderLang, setSenderLang] = useState("en");
  const [receiverLang, setReceiverLang] = useState("te");

  // ✅ Fetch chat messages from backend
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/get-chat", {
        params: { user1: senderEmail, user2: receiverEmail },
      });
      if (res.data.chats) setMessages(res.data.chats);
    } catch (err) {
      console.error("Error fetching chat:", err);
    }
  };

  // ✅ Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      await axios.post("http://127.0.0.1:5000/send-message", {
        sender_email: senderEmail,
        receiver_email: receiverEmail,
        message: input,
        sender_lang: senderLang,
        receiver_lang: receiverLang,
      });
      setInput("");
      fetchMessages(); // Refresh chat after sending
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [senderEmail, receiverEmail]);

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h3>Chat with Artisan</h3>
        <button onClick={onClose}>×</button>
      </div>

      <div className="chatbox-body">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${
              msg.sender_email === senderEmail ? "sent" : "received"
            }`}
          >
            <p>{msg.translated_message}</p>
          </div>
        ))}
      </div>

      <div className="chatbox-footer">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
