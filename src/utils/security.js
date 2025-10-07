/**
 * Security utilities for the application
 * Provides functions for secure data handling, validation, and protection
 */

// Input sanitization
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Remove potentially dangerous characters
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Phone validation
export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Password strength validation
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    minLength: password.length >= minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSpecialChar
  };
};

// XSS protection - escape HTML
export const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// CSRF token generation (client-side only, should be server-side in production)
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Secure storage with expiration
export const secureStorage = {
  setItem: (key, value, expirationMinutes = 60) => {
    const item = {
      value: value,
      timestamp: Date.now(),
      expiration: expirationMinutes * 60 * 1000
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  },
  
  getItem: (key) => {
    try {
      const item = JSON.parse(sessionStorage.getItem(key));
      if (!item) return null;
      
      const now = Date.now();
      if (now - item.timestamp > item.expiration) {
        sessionStorage.removeItem(key);
        return null;
      }
      
      return item.value;
    } catch (error) {
      sessionStorage.removeItem(key);
      return null;
    }
  },
  
  removeItem: (key) => {
    sessionStorage.removeItem(key);
  }
};

// Rate limiting (client-side basic implementation)
const rateLimitMap = new Map();

export const rateLimit = (key, maxRequests = 5, windowMs = 60000) => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, []);
  }
  
  const requests = rateLimitMap.get(key);
  
  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => timestamp > windowStart);
  rateLimitMap.set(key, validRequests);
  
  if (validRequests.length >= maxRequests) {
    return false; // Rate limit exceeded
  }
  
  validRequests.push(now);
  return true; // Request allowed
};

// Input validation for forms
export const validateFormInput = (fieldName, value, rules = {}) => {
  const errors = [];
  
  // Required validation
  if (rules.required && (!value || value.trim() === '')) {
    errors.push(`${fieldName} is required`);
  }
  
  // Length validation
  if (value && rules.minLength && value.length < rules.minLength) {
    errors.push(`${fieldName} must be at least ${rules.minLength} characters`);
  }
  
  if (value && rules.maxLength && value.length > rules.maxLength) {
    errors.push(`${fieldName} must be no more than ${rules.maxLength} characters`);
  }
  
  // Email validation
  if (value && rules.type === 'email' && !validateEmail(value)) {
    errors.push(`${fieldName} must be a valid email address`);
  }
  
  // Phone validation
  if (value && rules.type === 'phone' && !validatePhone(value)) {
    errors.push(`${fieldName} must be a valid phone number`);
  }
  
  // Password validation
  if (value && rules.type === 'password') {
    const passwordValidation = validatePassword(value);
    if (!passwordValidation.isValid) {
      errors.push(`${fieldName} must contain uppercase, lowercase, number, and special character`);
    }
  }
  
  return errors;
};

// Content Security Policy helper
export const getCSPNonce = () => {
  // In production, this should be generated server-side
  return btoa(Math.random().toString()).substring(0, 16);
};

// Secure API request helper
export const secureApiRequest = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    credentials: 'same-origin', // Include cookies for CSRF protection
  };
  
  // Add CSRF token if available
  const csrfToken = secureStorage.getItem('csrfToken');
  if (csrfToken) {
    defaultOptions.headers['X-CSRF-Token'] = csrfToken;
  }
  
  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, finalOptions);
    
    // Check for CSRF token in response headers
    const newCsrfToken = response.headers.get('X-CSRF-Token');
    if (newCsrfToken) {
      secureStorage.setItem('csrfToken', newCsrfToken, 60); // 1 hour
    }
    
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

const securityUtils = {
  sanitizeInput,
  validateEmail,
  validatePhone,
  validatePassword,
  escapeHtml,
  generateCSRFToken,
  secureStorage,
  rateLimit,
  validateFormInput,
  getCSPNonce,
  secureApiRequest
};

export default securityUtils;
