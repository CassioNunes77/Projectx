import React, { useEffect, useState } from 'react';
import './Notification.css';

interface NotificationProps {
  message: string;
  type: 'relationship' | 'premium' | 'info';
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
  duration = 4000
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show notification after a small delay
    const showTimer = setTimeout(() => setIsVisible(true), 100);

    // Auto-hide after duration
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'relationship':
        return '💫';
      case 'premium':
        return '✨';
      case 'info':
        return 'ℹ️';
      default:
        return '💬';
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case 'relationship':
        return 'notification-relationship';
      case 'premium':
        return 'notification-premium';
      case 'info':
        return 'notification-info';
      default:
        return '';
    }
  };

  return (
    <div className={`notification ${getTypeClass()} ${isVisible ? 'visible' : ''}`}>
      <div className="notification-content">
        <span className="notification-icon">{getIcon()}</span>
        <span className="notification-message">{message}</span>
        <button className="notification-close" onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification; 