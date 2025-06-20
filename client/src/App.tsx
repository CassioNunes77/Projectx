import React, { useState, useEffect } from 'react';
import { UserProvider } from './contexts/UserContext';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Onboarding from './components/Onboarding';
import './App.css';

interface User {
  id: string;
  name: string;
  relationshipLevel: number;
  conversationCount: number;
  lastActive: Date;
  preferences: {
    aiPersonality: string;
    conversationStyle: string;
    interests: string[];
  };
  subscription: {
    tier: 'free' | 'premium' | 'premium-plus';
    features: string[];
  };
}

function App() {
  const [currentView, setCurrentView] = useState<'chat' | 'profile' | 'settings' | 'onboarding'>('chat');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage
    const savedUser = localStorage.getItem('virtualCompanion_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setCurrentView('chat');
    } else {
      setCurrentView('onboarding');
    }
    setIsLoading(false);
  }, []);

  const handleUserCreated = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('virtualCompanion_user', JSON.stringify(newUser));
    setCurrentView('chat');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('virtualCompanion_user', JSON.stringify(updatedUser));
  };

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <UserProvider value={{ user, updateUser }}>
      <div className="app">
        {/* Minimalist Header */}
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">Companhia</h1>
            {user && (
              <nav className="app-nav">
                <button
                  className={`nav-btn ${currentView === 'chat' ? 'active' : ''}`}
                  onClick={() => setCurrentView('chat')}
                >
                  Conversar
                </button>
                <button
                  className={`nav-btn ${currentView === 'profile' ? 'active' : ''}`}
                  onClick={() => setCurrentView('profile')}
                >
                  Perfil
                </button>
                <button
                  className={`nav-btn ${currentView === 'settings' ? 'active' : ''}`}
                  onClick={() => setCurrentView('settings')}
                >
                  Configurações
                </button>
              </nav>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="app-main">
          {currentView === 'onboarding' && (
            <Onboarding onComplete={handleUserCreated} />
          )}
          {currentView === 'chat' && user && (
            <Chat user={user} />
          )}
          {currentView === 'profile' && user && (
            <Profile user={user} onUpdate={updateUser} />
          )}
          {currentView === 'settings' && user && (
            <Settings user={user} onUpdate={updateUser} />
          )}
        </main>

        {/* Subscription Banner */}
        {user && user.subscription.tier === 'free' && (
          <div className="subscription-banner">
            <p>Desbloqueie recursos exclusivos com o Premium</p>
            <button className="btn btn-primary">Ver Planos</button>
          </div>
        )}
      </div>
    </UserProvider>
  );
}

export default App; 