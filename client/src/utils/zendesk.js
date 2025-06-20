// Configuração do Zendesk
export const initZendesk = () => {
  window.zESettings = {
    webWidget: {
      color: {
        theme: '#667eea'
      },
      position: {
        horizontal: 'right',
        vertical: 'bottom'
      },
      launcher: {
        chatLabel: {
          'en-US': 'Chat with us'
        }
      }
    }
  };

  // Carregar script do Zendesk
  const script = document.createElement('script');
  script.id = 'ze-snippet';
  script.src = 'https://static.zdassets.com/ekr/snippet.js?key=your-zendesk-key'; // Substitua pela sua chave
  document.head.appendChild(script);
};

// Identificar usuário
export const identifyUser = (userId, userProperties = {}) => {
  if (window.zE) {
    window.zE('webWidget', 'identify', {
      name: userProperties.name || '',
      email: userProperties.email || '',
      ...userProperties
    });
  }
};

// Atualizar usuário
export const updateUser = (userProperties = {}) => {
  if (window.zE) {
    window.zE('webWidget', 'identify', userProperties);
  }
};

// Mostrar widget
export const showWidget = () => {
  if (window.zE) {
    window.zE('webWidget', 'show');
  }
};

// Esconder widget
export const hideWidget = () => {
  if (window.zE) {
    window.zE('webWidget', 'hide');
  }
};

// Abrir chat
export const openChat = () => {
  if (window.zE) {
    window.zE('webWidget', 'open');
  }
};

// Fechar chat
export const closeChat = () => {
  if (window.zE) {
    window.zE('webWidget', 'close');
  }
};

// Enviar mensagem
export const sendMessage = (message) => {
  if (window.zE) {
    window.zE('webWidget', 'send', message);
  }
};

// Rastrear evento
export const trackEvent = (eventName, properties = {}) => {
  if (window.zE) {
    window.zE('webWidget', 'track', eventName, properties);
  }
};

// Rastrear personalidade escolhida
export const trackPersonalityChoice = (personalityType) => {
  trackEvent('personality_selected', {
    personality: personalityType
  });
};

// Rastrear nível de relacionamento
export const trackRelationshipLevel = (level) => {
  trackEvent('relationship_level_up', {
    level: level
  });
};

// Rastrear mensagem enviada
export const trackMessageSent = (messageLength) => {
  trackEvent('message_sent', {
    length: messageLength
  });
};

// Rastrear erro
export const trackError = (error, context = {}) => {
  trackEvent('error_occurred', {
    error_message: error.message,
    ...context
  });
};

// Rastrear onboarding
export const trackOnboarding = (step, completed = false) => {
  trackEvent('onboarding_step', {
    step: step,
    completed: completed
  });
};

// Configurar atributos do usuário
export const setUserAttributes = (attributes = {}) => {
  if (window.zE) {
    window.zE('webWidget', 'identify', attributes);
  }
};

// Configurar atributos da empresa
export const setCompanyAttributes = (companyId, attributes = {}) => {
  if (window.zE) {
    window.zE('webWidget', 'identify', {
      company: {
        id: companyId,
        ...attributes
      }
    });
  }
};

// Configurar tags
export const setTags = (tags = []) => {
  if (window.zE) {
    window.zE('webWidget', 'identify', {
      tags: tags
    });
  }
};

// Configurar configurações
export const setConfiguration = (config = {}) => {
  if (window.zE) {
    window.zE('webWidget', 'setLocale', config.locale || 'en-US');
    if (config.theme) {
      window.zE('webWidget', 'updateSettings', {
        webWidget: {
          color: {
            theme: config.theme
          }
        }
      });
    }
  }
};

// Fechar Zendesk
export const shutdown = () => {
  if (window.zE) {
    window.zE('webWidget', 'hide');
  }
};

export default {
  initZendesk,
  identifyUser,
  updateUser,
  showWidget,
  hideWidget,
  openChat,
  closeChat,
  sendMessage,
  trackEvent,
  trackPersonalityChoice,
  trackRelationshipLevel,
  trackMessageSent,
  trackError,
  trackOnboarding,
  setUserAttributes,
  setCompanyAttributes,
  setTags,
  setConfiguration,
  shutdown,
}; 