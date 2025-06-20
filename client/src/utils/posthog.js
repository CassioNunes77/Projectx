import posthog from 'posthog-js';

// Inicializar PostHog
export const initPostHog = () => {
  posthog.init('your-posthog-api-key', {
    api_host: 'https://app.posthog.com',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    },
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: true,
  });
};

// Identificar usuário
export const identifyUser = (userId, userProperties = {}) => {
  posthog.identify(userId, userProperties);
};

// Rastrear evento
export const trackEvent = (eventName, properties = {}) => {
  posthog.capture(eventName, properties);
};

// Rastrear página visualizada
export const trackPageView = (pageName, properties = {}) => {
  posthog.capture('$pageview', {
    $current_url: pageName,
    ...properties
  });
};

// Rastrear personalidade escolhida
export const trackPersonalityChoice = (personalityType) => {
  trackEvent('personality_selected', {
    personality: personalityType,
    $set: {
      personality_type: personalityType
    }
  });
};

// Rastrear nível de relacionamento
export const trackRelationshipLevel = (level, previousLevel = null) => {
  trackEvent('relationship_level_up', {
    new_level: level,
    previous_level: previousLevel,
    $set: {
      relationship_level: level
    }
  });
};

// Rastrear mensagem enviada
export const trackMessageSent = (messageLength, personalityType) => {
  trackEvent('message_sent', {
    length: messageLength,
    personality: personalityType
  });
};

// Rastrear tempo de sessão
export const trackSessionDuration = (duration) => {
  trackEvent('session_duration', {
    duration_minutes: Math.round(duration / 60000)
  });
};

// Rastrear erro
export const trackError = (error, context = {}) => {
  trackEvent('error_occurred', {
    error_message: error.message,
    error_stack: error.stack,
    ...context
  });
};

// Rastrear conversão
export const trackConversion = (conversionType, value = 1) => {
  trackEvent('conversion', {
    type: conversionType,
    value: value
  });
};

// Rastrear feature usage
export const trackFeatureUsage = (featureName, properties = {}) => {
  trackEvent('feature_used', {
    feature: featureName,
    ...properties
  });
};

// Rastrear onboarding
export const trackOnboarding = (step, completed = false) => {
  trackEvent('onboarding_step', {
    step: step,
    completed: completed
  });
};

// Rastrear comportamento do usuário
export const trackUserBehavior = (action, context = {}) => {
  trackEvent('user_behavior', {
    action: action,
    ...context
  });
};

// Rastrear engajamento
export const trackEngagement = (engagementType, value = 1) => {
  trackEvent('engagement', {
    type: engagementType,
    value: value
  });
};

// Rastrear funnel
export const trackFunnel = (funnelName, step, properties = {}) => {
  trackEvent('funnel_step', {
    funnel: funnelName,
    step: step,
    ...properties
  });
};

// Rastrear A/B test
export const trackABTest = (experimentName, variant, properties = {}) => {
  trackEvent('ab_test', {
    experiment: experimentName,
    variant: variant,
    ...properties
  });
};

export default {
  initPostHog,
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
}; 