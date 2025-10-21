/**
 * Environment Detection Utilities
 * Helps detect if running on Vercel, localhost, or other environments
 */

// Check if running on Vercel
export const isVercel = () => {
  return process.env.NODE_ENV === 'production' && 
         (window.location.hostname.includes('vercel.app') || 
          process.env.VERCEL === '1');
};

// Check if running on localhost
export const isLocalhost = () => {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1';
};

// Get environment info
export const getEnvironment = () => {
  if (isVercel()) {
    return 'vercel';
  } else if (isLocalhost()) {
    return 'localhost';
  } else {
    return 'production';
  }
};

// Check if backend is available
export const isBackendAvailable = () => {
  // On Vercel, we don't have a backend, so use demo authentication
  return !isVercel();
};

export default {
  isVercel,
  isLocalhost,
  getEnvironment,
  isBackendAvailable
};
