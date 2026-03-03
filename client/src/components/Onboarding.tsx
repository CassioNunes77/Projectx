import React, { useState } from 'react';
import { User } from '../types';
import './Onboarding.css';

interface OnboardingProps {
  onComplete: (user: User) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [conversationStyle, setConversationStyle] = useState('casual');
  const [isLoading, setIsLoading] = useState(false);

  const conversationStyles = [
    { id: 'casual', name: 'Casual', description: 'Conversas descontraídas e amigáveis' },
    { id: 'deep', name: 'Profunda', description: 'Conversas mais reflexivas e significativas' },
    { id: 'funny', name: 'Divertida', description: 'Conversas engraçadas e leves' },
    { id: 'supportive', name: 'Apoiadora', description: 'Conversas de apoio e compreensão' }
  ];

  const handleSubmit = async () => {
    if (!name.trim()) return;

    setIsLoading(true);

    try {
      const user: User = {
        id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        name: name.trim(),
        relationshipLevel: 1,
        conversationCount: 0,
        lastActive: new Date(),
        preferences: {
          aiPersonality: 'friendly',
          conversationStyle,
          interests: []
        },
        subscription: {
          tier: 'free',
          features: ['chat_basic']
        }
      };

      try {
        onComplete(user);
      } catch (err) {
        console.error('Onboarding onComplete error:', err);
        throw err;
      }
    } catch (error) {
      console.error('Onboarding error:', error);
      const message = error instanceof Error ? error.message : String(error);
      alert(`Erro ao criar perfil. Detalhes: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step === 1 && name.trim()) {
      setStep(2);
    } else if (e.key === 'Enter' && step === 2) {
      handleSubmit();
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="onboarding-header">
          <h1>Companhia</h1>
          <p>Vamos começar uma conversa</p>
        </div>

        {step === 1 && (
          <div className="onboarding-step">
            <div className="step-content">
              <h2>Como posso te chamar?</h2>
              <p>Digite seu nome para começarmos a conversar</p>

              <div className="input-group">
                <input
                  type="text"
                  className="onboarding-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Seu nome"
                  autoFocus
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={() => setStep(2)}
                disabled={!name.trim()}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step">
            <div className="step-content">
              <h2>Que tipo de conversa você prefere?</h2>
              <p>Escolha o estilo que mais combina com você</p>

              <div className="style-options">
                {conversationStyles.map((style) => (
                  <button
                    key={style.id}
                    className={`style-option ${conversationStyle === style.id ? 'selected' : ''}`}
                    onClick={() => setConversationStyle(style.id)}
                  >
                    <div className="style-info">
                      <h3>{style.name}</h3>
                      <p>{style.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="button-group">
                <button
                  className="btn btn-secondary"
                  onClick={() => setStep(1)}
                >
                  Voltar
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      Criando perfil...
                    </>
                  ) : (
                    'Começar a conversar'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding; 