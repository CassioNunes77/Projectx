// Configuração do Crisp
export const initCrisp = () => {
  window.$crisp = [];
  window.CRISP_WEBSITE_ID = "your-crisp-website-id"; // Substitua pelo seu Website ID

  (function () {
    const d = document;
    const s = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    d.getElementsByTagName("head")[0].appendChild(s);
  })();
};

// Identificar usuário
export const identifyUser = (userId, userProperties = {}) => {
  if (window.$crisp) {
    window.$crisp.push(["set", "user:email", userProperties.email || ""]);
    window.$crisp.push(["set", "user:nickname", userProperties.name || ""]);
    window.$crisp.push(["set", "session:data", userProperties]);
  }
};

// Atualizar usuário
export const updateUser = (userProperties = {}) => {
  if (window.$crisp) {
    window.$crisp.push(["set", "session:data", userProperties]);
  }
};

// Mostrar chat
export const showChat = () => {
  if (window.$crisp) {
    window.$crisp.push(["do", "chat:show"]);
  }
};

// Esconder chat
export const hideChat = () => {
  if (window.$crisp) {
    window.$crisp.push(["do", "chat:hide"]);
  }
};

// Abrir conversa
export const openConversation = (message = '') => {
  if (window.$crisp) {
    if (message) {
      window.$crisp.push(["do", "message:show", ["text", message]]);
    }
    window.$crisp.push(["do", "chat:open"]);
  }
};

// Enviar mensagem
export const sendMessage = (message) => {
  if (window.$crisp) {
    window.$crisp.push(["do", "message:send", ["text", message]]);
  }
};

// Rastrear evento
export const trackEvent = (eventName, data = {}) => {
  if (window.$crisp) {
    window.$crisp.push(["set", "session:event", [[eventName, data]]]);
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
  if (window.$crisp) {
    window.$crisp.push(["set", "session:data", attributes]);
  }
};

// Configurar atributos da empresa
export const setCompanyAttributes = (companyId, attributes = {}) => {
  if (window.$crisp) {
    window.$crisp.push(["set", "session:data", {
      company_id: companyId,
      ...attributes
    }]);
  }
};

// Configurar tags
export const setTags = (tags = []) => {
  if (window.$crisp) {
    window.$crisp.push(["set", "session:tags", tags]);
  }
};

// Configurar segmentação
export const setSegmentation = (segmentation = {}) => {
  if (window.$crisp) {
    window.$crisp.push(["set", "session:segments", segmentation]);
  }
};

// Configurar configurações
export const setConfiguration = (config = {}) => {
  if (window.$crisp) {
    window.$crisp.push(["config", "set", config]);
  }
};

// Fechar Crisp
export const shutdown = () => {
  if (window.$crisp) {
    window.$crisp.push(["do", "session:reset"]);
  }
};

export default {
  initCrisp,
  identifyUser,
  updateUser,
  showChat,
  hideChat,
  openConversation,
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
  setSegmentation,
  setConfiguration,
  shutdown,
}; 