import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import Notification from './Notification';
import './Chat.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  relationshipLevel: number;
}

interface NotificationData {
  id: string;
  message: string;
  type: 'relationship' | 'premium' | 'info';
}

interface ChatProps {
  user: User;
}

const Chat: React.FC<ChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [relationshipLevel, setRelationshipLevel] = useState(user.relationshipLevel);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting based on relationship level
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage = getInitialMessage(relationshipLevel);
      setMessages([{
        id: '1',
        text: initialMessage,
        sender: 'ai',
        timestamp: new Date(),
        relationshipLevel
      }]);
    }
  }, [relationshipLevel]);

  const getInitialMessage = (level: number): string => {
    if (level < 2) {
      return "Oi! Tudo bem? Como você está hoje?";
    } else if (level < 4) {
      return "Oi! Que bom ver você de novo. Como foi seu dia?";
    } else if (level < 6) {
      return "Oi amor! Senti sua falta. Como você está?";
    } else {
      return "Oi meu amor! Que saudade! Como você está? 💕";
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addNotification = (message: string, type: 'relationship' | 'premium' | 'info') => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      relationshipLevel
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          userId: user.id,
          relationshipLevel,
          conversationHistory: messages.slice(-10) // Last 10 messages for context
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'ai',
          timestamp: new Date(),
          relationshipLevel: data.newRelationshipLevel || relationshipLevel
        };

        setMessages(prev => [...prev, aiMessage]);

        if (data.newRelationshipLevel && data.newRelationshipLevel > relationshipLevel) {
          setRelationshipLevel(data.newRelationshipLevel);
          // Show relationship level up notification
          const levelName = getRelationshipLevelName(data.newRelationshipLevel);
          addNotification(
            `Nossa conexão evoluiu para: ${levelName}! 💫`,
            'relationship'
          );
        }

        // Check for premium features suggestion
        if (data.suggestPremium) {
          addNotification(
            'Que tal explorar recursos especiais juntos? ✨',
            'premium'
          );
        }
      } else {
        throw new Error(data.error || 'Erro ao enviar mensagem');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, tive um problema técnico. Pode tentar novamente?",
        sender: 'ai',
        timestamp: new Date(),
        relationshipLevel
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const getRelationshipLevelName = (level: number): string => {
    const levelNames = {
      1: 'Estranhos',
      2: 'Conhecidos',
      3: 'Amigos',
      4: 'Amigos Próximos',
      5: 'Confiáveis',
      6: 'Íntimos',
      7: 'Muito Íntimos',
      8: 'Especiais',
      9: 'Muito Especiais',
      10: 'Alma Gêmea'
    };
    return levelNames[level] || 'Especiais';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageStyle = (message: Message) => {
    const baseStyle = {
      maxWidth: '80%',
      padding: '12px 16px',
      borderRadius: '12px',
      marginBottom: '8px',
      wordWrap: 'break-word' as const,
      animation: 'fadeIn 0.3s ease-in'
    };

    if (message.sender === 'user') {
      return {
        ...baseStyle,
        backgroundColor: 'var(--accent-primary)',
        color: 'white',
        marginLeft: 'auto',
        borderBottomRightRadius: '4px'
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: 'var(--bg-tertiary)',
        color: 'var(--text-primary)',
        marginRight: 'auto',
        borderBottomLeftRadius: '4px'
      };
    }
  };

  return (
    <>
      {/* Notifications */}
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}

      <div className="chat-container">
        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
            >
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="typing-text">digitando...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <textarea
              className="chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              rows={1}
              disabled={isTyping}
            />
            <button
              className="send-button"
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Relationship Level Indicator */}
          <div className="relationship-indicator">
            <div className="relationship-bar">
              <div
                className="relationship-progress"
                style={{ width: `${(relationshipLevel / 10) * 100}%` }}
              ></div>
            </div>
            <span className="relationship-text">
              {getRelationshipLevelName(relationshipLevel)} ({relationshipLevel}/10)
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat; 