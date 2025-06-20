import mixpanel from 'mixpanel-browser';

// Inicializar Mixpanel
export const initMixpanel = () => {
  mixpanel.init('your-mixpanel-token'); // Substitua pelo seu token
};

// Identificar usuário
export const identifyUser = (userId, userProperties = {}) => {
  mixpanel.identify(userId);
  mixpanel.people.set(userProperties);
};

// Rastrear evento
export const trackEvent = (eventName, properties = {}) => {
  mixpanel.track(eventName, properties);
};

// Rastrear página visualizada
export const trackPageView = (pageName, properties = {}) => {
  trackEvent('Page Viewed', {
    page: pageName,
    ...properties
  });
};

// Rastrear personalidade escolhida
export const trackPersonalityChoice = (personalityType) => {
  trackEvent('Personality Selected', {
    personality: personalityType
  });
};

// Rastrear nível de relacionamento
export const trackRelationshipLevel = (level, previousLevel = null) => {
  trackEvent('Relationship Level Up', {
    new_level: level,
    previous_level: previousLevel
  });
};

// Rastrear mensagem enviada
export const trackMessageSent = (messageLength, personalityType) => {
  trackEvent('Message Sent', {
    length: messageLength,
    personality: personalityType
  });
};

// Rastrear tempo de sessão
export const trackSessionDuration = (duration) => {
  trackEvent('Session Duration', {
    duration_minutes: Math.round(duration / 60000)
  });
};

// Rastrear erro
export const trackError = (error, context = {}) => {
  trackEvent('Error Occurred', {
    error_message: error.message,
    error_stack: error.stack,
    ...context
  });
};

// Rastrear conversão
export const trackConversion = (conversionType, value = 1) => {
  trackEvent('Conversion', {
    type: conversionType,
    value: value
  });
};

// Rastrear feature usage
export const trackFeatureUsage = (featureName, properties = {}) => {
  trackEvent('Feature Used', {
    feature: featureName,
    ...properties
  });
};

// Rastrear onboarding
export const trackOnboarding = (step, completed = false) => {
  trackEvent('Onboarding Step', {
    step: step,
    completed: completed
  });
};

export default {
  initMixpanel,
  identifyUser,
  trackEvent,
  trackPageView,
  trackPersonalityChoice,
  trackRelationshipLevel,
  trackMessageSent,
  trackSessionDuration,
  trackError,
  trackConversion,
  trackFeatureUsage,
  trackOnboarding,
}; 