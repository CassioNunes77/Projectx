// Configuração do Help Scout
export const initHelpScout = () => {
  window.Beacon = window.Beacon || {};

  window.Beacon('init', 'your-helpscout-beacon-id'); // Substitua pelo seu Beacon ID
};

// Identificar usuário
export const identifyUser = (userId, userProperties = {}) => {
  if (window.Beacon) {
    window.Beacon('identify', {
      name: userProperties.name || '',
      email: userProperties.email || '',
      ...userProperties
    });
  }
};

// Atualizar usuário
export const updateUser = (userProperties = {}) => {
  if (window.Beacon) {
    window.Beacon('identify', userProperties);
  }
};

// Mostrar beacon
export const showBeacon = () => {
  if (window.Beacon) {
    window.Beacon('open');
  }
};

// Esconder beacon
export const hideBeacon = () => {
  if (window.Beacon) {
    window.Beacon('close');
  }
};

// Abrir conversa
export const openConversation = () => {
  if (window.Beacon) {
    window.Beacon('open', 'message');
  }
};

// Fechar conversa
export const closeConversation = () => {
  if (window.Beacon) {
    window.Beacon('close');
  }
};

// Enviar mensagem
export const sendMessage = (message) => {
  if (window.Beacon) {
    window.Beacon('message', message);
  }
};

// Rastrear evento
export const trackEvent = (eventName, properties = {}) => {
  if (window.Beacon) {
    window.Beacon('event', {
      name: eventName,
      ...properties
    });
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
  if (window.Beacon) {
    window.Beacon('identify', attributes);
  }
};

// Configurar atributos da empresa
export const setCompanyAttributes = (companyId, attributes = {}) => {
  if (window.Beacon) {
    window.Beacon('identify', {
      company: {
        id: companyId,
        ...attributes
      }
    });
  }
};

// Configurar tags
export const setTags = (tags = []) => {
  if (window.Beacon) {
    window.Beacon('identify', {
      tags: tags
    });
  }
};

// Configurar configurações
export const setConfiguration = (config = {}) => {
  if (window.Beacon) {
    if (config.locale) {
      window.Beacon('config', {
        locale: config.locale
      });
    }
    if (config.theme) {
      window.Beacon('config', {
        theme: config.theme
      });
    }
  }
};

// Fechar Help Scout
export const shutdown = () => {
  if (window.Beacon) {
    window.Beacon('close');
  }
};

export default {
  initHelpScout,
  identifyUser,
  updateUser,
  showBeacon,
  hideBeacon,
  openConversation,
  closeConversation,
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