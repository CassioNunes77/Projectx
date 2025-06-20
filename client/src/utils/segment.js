import Analytics from '@segment/analytics-react-native';

// Inicializar Segment
export const initSegment = () => {
  Analytics.setup('your-segment-write-key', {
    trackAppLifecycleEvents: true,
    recordScreenViews: true,
  });
};

// Identificar usuário
export const identifyUser = (userId, traits = {}) => {
  Analytics.identify(userId, traits);
};

// Rastrear evento
export const trackEvent = (eventName, properties = {}) => {
  Analytics.track(eventName, properties);
};

// Rastrear página visualizada
export const trackPageView = (pageName, properties = {}) => {
  Analytics.screen(pageName, properties);
};

// Rastrear personalidade escolhida
export const trackPersonalityChoice = (personalityType) => {
  trackEvent('Personality Selected', {
    personality: personalityType,
    timestamp: new Date().toISOString()
  });
};

// Rastrear nível de relacionamento
export const trackRelationshipLevel = (level, previousLevel = null) => {
  trackEvent('Relationship Level Up', {
    new_level: level,
    previous_level: previousLevel,
    timestamp: new Date().toISOString()
  });
};

// Rastrear mensagem enviada
export const trackMessageSent = (messageLength, personalityType) => {
  trackEvent('Message Sent', {
    length: messageLength,
    personality: personalityType,
    timestamp: new Date().toISOString()
  });
};

// Rastrear tempo de sessão
export const trackSessionDuration = (duration) => {
  trackEvent('Session Duration', {
    duration_minutes: Math.round(duration / 60000),
    timestamp: new Date().toISOString()
  });
};

// Rastrear erro
export const trackError = (error, context = {}) => {
  trackEvent('Error Occurred', {
    error_message: error.message,
    error_stack: error.stack,
    ...context,
    timestamp: new Date().toISOString()
  });
};

// Rastrear conversão
export const trackConversion = (conversionType, value = 1) => {
  trackEvent('Conversion', {
    type: conversionType,
    value: value,
    timestamp: new Date().toISOString()
  });
};

// Rastrear feature usage
export const trackFeatureUsage = (featureName, properties = {}) => {
  trackEvent('Feature Used', {
    feature: featureName,
    ...properties,
    timestamp: new Date().toISOString()
  });
};

// Rastrear onboarding
export const trackOnboarding = (step, completed = false) => {
  trackEvent('Onboarding Step', {
    step: step,
    completed: completed,
    timestamp: new Date().toISOString()
  });
};

// Rastrear comportamento do usuário
export const trackUserBehavior = (action, context = {}) => {
  trackEvent('User Behavior', {
    action: action,
    ...context,
    timestamp: new Date().toISOString()
  });
};

// Rastrear engajamento
export const trackEngagement = (engagementType, value = 1) => {
  trackEvent('Engagement', {
    type: engagementType,
    value: value,
    timestamp: new Date().toISOString()
  });
};

export default {
  initSegment,
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
  trackUserBehavior,
  trackEngagement,
}; 