import ReactGA from 'react-ga4';

// Inicializar Google Analytics
export const initGA = () => {
  ReactGA.initialize('G-XXXXXXXXXX'); // Substitua pelo seu ID do GA4
};

// Rastrear visualização de página
export const logPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Rastrear evento
export const logEvent = (category, action, label = null, value = null) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Rastrear conversão
export const logConversion = (conversionId, conversionLabel) => {
  ReactGA.event({
    category: 'conversion',
    action: 'purchase',
    label: conversionLabel,
    value: 1,
  });
};

// Rastrear interação do usuário
export const logUserInteraction = (action, label = null) => {
  logEvent('user_interaction', action, label);
};

// Rastrear erro
export const logError = (error, context = {}) => {
  logEvent('error', error.message, error.stack, 1);
};

// Rastrear personalidade escolhida
export const logPersonalityChoice = (personalityType) => {
  logEvent('personality_choice', 'select', personalityType);
};

// Rastrear nível de relacionamento
export const logRelationshipLevel = (level) => {
  logEvent('relationship_level', 'upgrade', `level_${level}`);
};

// Rastrear mensagem enviada
export const logMessageSent = (messageLength) => {
  logEvent('message', 'send', 'chat', messageLength);
};

// Rastrear tempo de sessão
export const logSessionDuration = (duration) => {
  logEvent('session', 'duration', 'minutes', Math.round(duration / 60000));
};

export default {
  initGA,
  logPageView,
  logEvent,
  logConversion,
  logUserInteraction,
  logError,
  logPersonalityChoice,
  logRelationshipLevel,
  logMessageSent,
  logSessionDuration,
}; 