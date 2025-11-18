import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Ciao! Sono il tuo assistente AI per film. Come posso aiutarti?", sender: 'ai' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
        }, 
        body: JSON.stringify({ 
          message: inputMessage, 
          context: 'film-cinema' 
        }) 
      }); 
      
      const data = await response.json(); 
      const aiMessage = { 
        text: data.reply || "Mi dispiace, non ho capito.", 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Errore chat:', error);
      const errorMessage = { 
        text: "Errore di connessione con l'AI.", 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chat Button */}
      {!isOpen && (
        <button className="chatbot-toggle-btn" onClick={toggleChat}>
          <i className="bi bi-suit-club-fill"></i> <span> AI ASSISTANT</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>AI Film Assistant</h3>
            <button className="close-btn" onClick={toggleChat}>×</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="message ai loading">
                ...Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Chiedimi informazioni sui film..."
              disabled={isLoading}
            />
            <button onClick={sendMessage} disabled={isLoading}>
              ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;