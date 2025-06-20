// Configuração do Intercom
export const initIntercom = () => {
  window.intercomSettings = {
    api_base: "https://api-iam.intercom.io",
    app_id: "your-intercom-app-id" // Substitua pelo seu App ID
  };

  (function () { var w = window; var ic = w.Intercom; if (typeof ic === "function") { ic('reattach_activator'); ic('update', w.intercomSettings); } else { var d = document; var i = function () { i.c(arguments); }; i.q = []; i.c = function (args) { i.q.push(args); }; w.Intercom = i; var l = function () { var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = 'https://widget.intercom.io/widget/' + w.intercomSettings.app_id; var x = d.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x); }; if (document.readyState === 'complete') { l(); } else if (w.attachEvent) { w.attachEvent('onload', l); } else { w.addEventListener('load', l, false); } } })();
};

// Identificar usuário
export const identifyUser = (userId, userProperties = {}) => {
  if (window.Intercom) {
    window.Intercom('identify', {
      user_id: userId,
      ...userProperties
    });
  }
};

// Atualizar usuário
export const updateUser = (userProperties = {}) => {
  if (window.Intercom) {
    window.Intercom('update', userProperties);
  }
};

// Mostrar messenger
export const showMessenger = () => {
  if (window.Intercom) {
    window.Intercom('show');
  }
};

// Esconder messenger
export const hideMessenger = () => {
  if (window.Intercom) {
    window.Intercom('hide');
  }
};

// Mostrar nova conversa
export const showNewConversation = (message = '') => {
  if (window.Intercom) {
    window.Intercom('showNewMessage', message);
  }
};

// Rastrear evento
export const trackEvent = (eventName, metadata = {}) => {
  if (window.Intercom) {
    window.Intercom('trackEvent', eventName, metadata);
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
  if (window.Intercom) {
    window.Intercom('update', {
      custom_launcher_selector: '#intercom-launcher',
      ...attributes
    });
  }
};

// Configurar atributos da empresa
export const setCompanyAttributes = (companyId, attributes = {}) => {
  if (window.Intercom) {
    window.Intercom('update', {
      company: {
        id: companyId,
        ...attributes
      }
    });
  }
};

// Iniciar tour
export const startTour = (tourId) => {
  if (window.Intercom) {
    window.Intercom('startTour', tourId);
  }
};

// Fechar Intercom
export const shutdown = () => {
  if (window.Intercom) {
    window.Intercom('shutdown');
  }
};

export default {
  initIntercom,
  identifyUser,
  updateUser,
  showMessenger,
  hideMessenger,
  showNewConversation,
  trackEvent,
  trackPersonalityChoice,
  trackRelationshipLevel,
  trackMessageSent,
  trackError,
  trackOnboarding,
  setUserAttributes,
  setCompanyAttributes,
  startTour,
  shutdown,
}; 