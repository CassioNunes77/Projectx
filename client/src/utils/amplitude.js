import * as amplitude from '@amplitude/analytics-browser';

// Inicializar Amplitude
export const initAmplitude = () => {
  amplitude.init('your-amplitude-api-key', {
    defaultTracking: {
      sessions: true,
      pageViews: true,
      formInteractions: true,
      fileDownloads: true,
    },
  });
};

// Identificar usuário
export const identifyUser = (userId, userProperties = {}) => {
  amplitude.setUserId(userId);
  amplitude.setUserProperties(userProperties);
};

// Rastrear evento
export const trackEvent = (eventName, eventProperties = {}) => {
  amplitude.track(eventName, eventProperties);
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
    personality: personalityType,
    timestamp: Date.now()
  });
};

// Rastrear nível de relacionamento
export const trackRelationshipLevel = (level, previousLevel = null) => {
  trackEvent('Relationship Level Up', {
    new_level: level,
    previous_level: previousLevel,
    timestamp: Date.now()
  });
};

// Rastrear mensagem enviada
export const trackMessageSent = (messageLength, personalityType) => {
  trackEvent('Message Sent', {
    length: messageLength,
    personality: personalityType,
    timestamp: Date.now()
  });
};

// Rastrear tempo de sessão
export const trackSessionDuration = (duration) => {
  trackEvent('Session Duration', {
    duration_minutes: Math.round(duration / 60000),
    timestamp: Date.now()
  });
};

// Rastrear erro
export const trackError = (error, context = {}) => {
  trackEvent('Error Occurred', {
    error_message: error.message,
    error_stack: error.stack,
    ...context,
    timestamp: Date.now()
  });
};

// Rastrear conversão
export const trackConversion = (conversionType, value = 1) => {
  trackEvent('Conversion', {
    type: conversionType,
    value: value,
    timestamp: Date.now()
  });
};

// Rastrear feature usage
export const trackFeatureUsage = (featureName, properties = {}) => {
  trackEvent('Feature Used', {
    feature: featureName,
    ...properties,
    timestamp: Date.now()
  });
};

// Rastrear onboarding
export const trackOnboarding = (step, completed = false) => {
  trackEvent('Onboarding Step', {
    step: step,
    completed: completed,
    timestamp: Date.now()
  });
};

// Rastrear comportamento do usuário
export const trackUserBehavior = (action, context = {}) => {
  trackEvent('User Behavior', {
    action: action,
    ...context,
    timestamp: Date.now()
  });
};

// Rastrear engajamento
export const trackEngagement = (engagementType, value = 1) => {
  trackEvent('Engagement', {
    type: engagementType,
    value: value,
    timestamp: Date.now()
  });
};

// Rastrear funnel
export const trackFunnel = (funnelName, step, properties = {}) => {
  trackEvent('Funnel Step', {
    funnel: funnelName,
    step: step,
    ...properties,
    timestamp: Date.now()
  });
};

// Rastrear A/B test
export const trackABTest = (experimentName, variant, properties = {}) => {
  trackEvent('AB Test', {
    experiment: experimentName,
    variant: variant,
    ...properties,
    timestamp: Date.now()
  });
};

// Rastrear revenue
export const trackRevenue = (amount, productId = null, quantity = 1) => {
  trackEvent('Revenue', {
    amount: amount,
    product_id: productId,
    quantity: quantity,
    timestamp: Date.now()
  });
};

export default {
  initAmplitude,
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
  trackFunnel,
  trackABTest,
  trackRevenue,
}; 