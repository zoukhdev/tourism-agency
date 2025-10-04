/**
 * Debug Utilities - Development debugging helpers
 * 
 * Features:
 * - Console logging with timestamps
 * - Performance monitoring
 * - State change tracking
 * - Network request logging
 */

// Debug configuration
const DEBUG_CONFIG = {
  enabled: process.env.NODE_ENV === 'development',
  logLevel: 'info', // 'error', 'warn', 'info', 'debug'
  showTimestamps: true,
  showComponentName: true
};

// Debug logger with different levels
export const debugLog = {
  error: (message, data = null, component = '') => {
    if (DEBUG_CONFIG.enabled) {
      const timestamp = DEBUG_CONFIG.showTimestamps ? `[${new Date().toISOString()}]` : '';
      const componentName = DEBUG_CONFIG.showComponentName && component ? `[${component}]` : '';
      console.error(`🔴 ERROR ${timestamp} ${componentName}`, message, data);
    }
  },

  warn: (message, data = null, component = '') => {
    if (DEBUG_CONFIG.enabled) {
      const timestamp = DEBUG_CONFIG.showTimestamps ? `[${new Date().toISOString()}]` : '';
      const componentName = DEBUG_CONFIG.showComponentName && component ? `[${component}]` : '';
      console.warn(`🟡 WARN ${timestamp} ${componentName}`, message, data);
    }
  },

  info: (message, data = null, component = '') => {
    if (DEBUG_CONFIG.enabled) {
      const timestamp = DEBUG_CONFIG.showTimestamps ? `[${new Date().toISOString()}]` : '';
      const componentName = DEBUG_CONFIG.showComponentName && component ? `[${component}]` : '';
      console.info(`🔵 INFO ${timestamp} ${componentName}`, message, data);
    }
  },

  debug: (message, data = null, component = '') => {
    if (DEBUG_CONFIG.enabled) {
      const timestamp = DEBUG_CONFIG.showTimestamps ? `[${new Date().toISOString()}]` : '';
      const componentName = DEBUG_CONFIG.showComponentName && component ? `[${component}]` : '';
      console.log(`🟢 DEBUG ${timestamp} ${componentName}`, message, data);
    }
  }
};

// Performance monitoring
export const performanceMonitor = {
  start: (label) => {
    if (DEBUG_CONFIG.enabled) {
      performance.mark(`${label}-start`);
      debugLog.info(`Performance monitoring started: ${label}`);
    }
  },

  end: (label) => {
    if (DEBUG_CONFIG.enabled) {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);
      const measure = performance.getEntriesByName(label)[0];
      debugLog.info(`Performance: ${label} took ${measure.duration.toFixed(2)}ms`);
    }
  }
};

// State change tracker
export const stateTracker = {
  logStateChange: (componentName, prevState, newState, action = '') => {
    if (DEBUG_CONFIG.enabled) {
      debugLog.debug(`State changed in ${componentName}`, {
        action,
        previous: prevState,
        current: newState,
        changes: getStateChanges(prevState, newState)
      }, componentName);
    }
  }
};

// Helper function to detect state changes
const getStateChanges = (prev, current) => {
  const changes = {};
  const allKeys = new Set([...Object.keys(prev || {}), ...Object.keys(current || {})]);
  
  allKeys.forEach(key => {
    if (prev?.[key] !== current?.[key]) {
      changes[key] = {
        from: prev?.[key],
        to: current?.[key]
      };
    }
  });
  
  return changes;
};

// Network request logger
export const networkLogger = {
  logRequest: (url, method, data = null) => {
    if (DEBUG_CONFIG.enabled) {
      debugLog.info(`Network Request: ${method} ${url}`, data, 'Network');
    }
  },

  logResponse: (url, status, data = null) => {
    if (DEBUG_CONFIG.enabled) {
      const level = status >= 400 ? 'error' : 'info';
      debugLog[level](`Network Response: ${status} ${url}`, data, 'Network');
    }
  }
};

// Component lifecycle logger
export const lifecycleLogger = {
  componentDidMount: (componentName) => {
    debugLog.info(`Component mounted: ${componentName}`, null, componentName);
  },

  componentWillUnmount: (componentName) => {
    debugLog.info(`Component unmounting: ${componentName}`, null, componentName);
  },

  componentDidUpdate: (componentName, prevProps, prevState) => {
    debugLog.debug(`Component updated: ${componentName}`, {
      prevProps,
      prevState
    }, componentName);
  }
};

// Export default debug utilities
export default {
  log: debugLog,
  performance: performanceMonitor,
  state: stateTracker,
  network: networkLogger,
  lifecycle: lifecycleLogger
};
