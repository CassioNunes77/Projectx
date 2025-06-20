// Configuração do Hotjar
export const initHotjar = () => {
  (function (h, o, t, j, a, r) {
    h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
    h._hjSettings = { hjid: 1234567, hjsv: 6 }; // Substitua pelo seu ID do Hotjar
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script'); r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
};

// Identificar usuário no Hotjar
export const identifyUser = (userId, userProperties = {}) => {
  if (window.hj) {
    window.hj('identify', userId, userProperties);
  }
};

// Rastrear evento customizado
export const trackEvent = (eventName, properties = {}) => {
  if (window.hj) {
    window.hj('event', eventName, properties);
  }
};

// Rastrear conversão
export const trackConversion = (conversionType, value = 1) => {
  trackEvent('conversion', {
    type: conversionType,
    value: value
  });
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

// Rastrear tempo de sessão
export const trackSessionDuration = (duration) => {
  trackEvent('session_duration', {
    duration: duration
  });
};

export default {
  initHotjar,
  identifyUser,
  trackEvent,
  trackConversion,
  trackPersonalityChoice,
  trackRelationshipLevel,
  trackMessageSent,
  trackSessionDuration,
}; 