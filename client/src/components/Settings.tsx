import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Settings, LogOut, User, Bell, Moon, Sun, Volume2, VolumeX, Heart, Palette } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '../contexts/UserContext';
import { User as UserType } from '../types';
import './Settings.css';

const SettingsContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem 6rem 1rem;
  color: white;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const SettingsCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const SettingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SettingIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffd700;
`;

const SettingText = styled.div`
  flex: 1;
`;

const SettingLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const SettingDescription = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background: #4ade80;
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.3);
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const DangerButton = styled(Button)`
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.3);
  color: #fca5a5;

  &:hover {
    background: rgba(239, 68, 68, 0.3);
  }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  padding: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;

  option {
    background: #333;
    color: white;
  }
`;

interface SettingsProps {
  user: UserType;
  onUpdate: (user: UserType) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdate }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'premium'>('profile');
  const [isLoading, setIsLoading] = useState(false);

  const premiumFeatures = [
    {
      id: 'photos',
      name: 'Fotos e Áudios',
      description: 'Compartilhe momentos especiais com fotos e áudios',
      icon: '📸',
      available: ['premium', 'premium-plus']
    },
    {
      id: 'voice',
      name: 'Chamadas de Voz',
      description: 'Ouça a voz da sua companhia em chamadas de áudio',
      icon: '🎤',
      available: ['premium', 'premium-plus']
    },
    {
      id: 'video',
      name: 'Chamadas de Vídeo',
      description: 'Veja e converse em tempo real com sua companhia',
      icon: '📹',
      available: ['premium-plus']
    },
    {
      id: 'custom',
      name: 'Personalização Avançada',
      description: 'Personalize completamente a personalidade da sua companhia',
      icon: '🎨',
      available: ['premium-plus']
    },
    {
      id: 'surprises',
      name: 'Surpresas Personalizadas',
      description: 'Receba surpresas e momentos especiais únicos',
      icon: '🎁',
      available: ['premium', 'premium-plus']
    },
    {
      id: 'memory',
      name: 'Memória Avançada',
      description: 'Sua companhia lembra de todos os detalhes importantes',
      icon: '🧠',
      available: ['premium', 'premium-plus']
    }
  ];

  const subscriptionPlans = [
    {
      id: 'free',
      name: 'Gratuito',
      price: 'R$ 0',
      features: ['Chat básico', 'Personalidade padrão', 'Memória básica'],
      current: user.subscription.tier === 'free'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$ 19,90/mês',
      features: ['Chat avançado', 'Fotos e áudios', 'Chamadas de voz', 'Surpresas', 'Memória avançada'],
      current: user.subscription.tier === 'premium'
    },
    {
      id: 'premium-plus',
      name: 'Premium+',
      price: 'R$ 39,90/mês',
      features: ['Tudo do Premium', 'Chamadas de vídeo', 'Personalização completa', 'Prioridade total'],
      current: user.subscription.tier === 'premium-plus'
    }
  ];

  const handleSubscriptionChange = async (planId: string) => {
    if (planId === user.subscription.tier) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          tier: planId
        }),
      });

      const data = await response.json();
      if (data.success) {
        onUpdate(data.user);
      } else {
        throw new Error(data.error || 'Erro ao alterar plano');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Erro ao alterar plano. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFeatureAvailable = (featureId: string) => {
    return user.subscription.features.includes(featureId);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Configurações</h1>
        <p>Personalize sua experiência</p>
      </div>

      {/* Tabs */}
      <div className="settings-tabs">
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Perfil
        </button>
        <button
          className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          Preferências
        </button>
        <button
          className={`tab-btn ${activeTab === 'premium' ? 'active' : ''}`}
          onClick={() => setActiveTab('premium')}
        >
          Premium
        </button>
      </div>

      {/* Tab Content */}
      <div className="settings-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="profile-info">
              <h3>Informações do Perfil</h3>
              <div className="info-item">
                <span className="info-label">Nome:</span>
                <span className="info-value">{user.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Nível de Relacionamento:</span>
                <span className="info-value">{user.relationshipLevel}/10</span>
              </div>
              <div className="info-item">
                <span className="info-label">Conversas:</span>
                <span className="info-value">{user.conversationCount}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Última Atividade:</span>
                <span className="info-value">
                  {new Date(user.lastActive).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="preferences-section">
            <h3>Preferências de Conversa</h3>
            <div className="preference-item">
              <label>Estilo de Conversa:</label>
              <select
                value={user.preferences.conversationStyle}
                onChange={(e) => {
                  const updatedUser = {
                    ...user,
                    preferences: {
                      ...user.preferences,
                      conversationStyle: e.target.value
                    }
                  };
                  onUpdate(updatedUser);
                }}
              >
                <option value="casual">Casual</option>
                <option value="deep">Profunda</option>
                <option value="funny">Divertida</option>
                <option value="supportive">Apoiadora</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'premium' && (
          <div className="premium-section">
            <div className="premium-header">
              <h3>Recursos Premium</h3>
              <p>Desbloqueie experiências especiais com sua companhia</p>
            </div>

            {/* Current Plan */}
            <div className="current-plan">
              <h4>Seu Plano Atual</h4>
              <div className="plan-card current">
                <div className="plan-info">
                  <h5>{subscriptionPlans.find(p => p.id === user.subscription.tier)?.name}</h5>
                  <p>{subscriptionPlans.find(p => p.id === user.subscription.tier)?.price}</p>
                </div>
                <div className="plan-features">
                  {subscriptionPlans.find(p => p.id === user.subscription.tier)?.features.map(feature => (
                    <span key={feature} className="feature-tag">✓ {feature}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Available Features */}
            <div className="features-grid">
              {premiumFeatures.map(feature => (
                <div
                  key={feature.id}
                  className={`feature-card ${isFeatureAvailable(feature.id) ? 'available' : 'locked'}`}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-info">
                    <h4>{feature.name}</h4>
                    <p>{feature.description}</p>
                  </div>
                  <div className="feature-status">
                    {isFeatureAvailable(feature.id) ? (
                      <span className="status-available">✓ Disponível</span>
                    ) : (
                      <span className="status-locked">🔒 Bloqueado</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Upgrade Options */}
            {user.subscription.tier === 'free' && (
              <div className="upgrade-section">
                <h4>Fazer Upgrade</h4>
                <div className="plans-grid">
                  {subscriptionPlans.filter(plan => plan.id !== 'free').map(plan => (
                    <div key={plan.id} className="plan-card upgrade">
                      <div className="plan-header">
                        <h5>{plan.name}</h5>
                        <div className="plan-price">{plan.price}</div>
                      </div>
                      <div className="plan-features">
                        {plan.features.map(feature => (
                          <span key={feature} className="feature-tag">✓ {feature}</span>
                        ))}
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSubscriptionChange(plan.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processando...' : 'Escolher Plano'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings; 