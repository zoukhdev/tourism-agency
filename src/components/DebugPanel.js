/**
 * DebugPanel Component - Development debugging tool
 * 
 * Features:
 * - Shows current app state
 * - Displays component props
 * - Logs user interactions
 * - Performance monitoring
 * - Only visible in development mode
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const DebugPanel = ({ componentName, props = {} }) => {
  const { isDarkMode, language, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const debugInfo = {
    component: componentName,
    timestamp: new Date().toLocaleTimeString(),
    appState: {
      isDarkMode,
      language,
      currentTranslation: t('home')
    },
    props: props,
    windowSize: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Debug Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
        title="Toggle Debug Panel"
      >
        🐛
      </button>

      {/* Debug Panel */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-black bg-opacity-90 text-white p-4 rounded-lg shadow-xl max-w-sm max-h-96 overflow-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-sm">Debug Info</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="text-xs space-y-2">
            <div>
              <strong>Component:</strong> {componentName}
            </div>
            <div>
              <strong>Time:</strong> {debugInfo.timestamp}
            </div>
            <div>
              <strong>Dark Mode:</strong> {isDarkMode ? 'ON' : 'OFF'}
            </div>
            <div>
              <strong>Language:</strong> {language}
            </div>
            <div>
              <strong>Window:</strong> {debugInfo.windowSize.width}x{debugInfo.windowSize.height}
            </div>
            
            {Object.keys(props).length > 0 && (
              <div>
                <strong>Props:</strong>
                <pre className="mt-1 text-xs bg-gray-800 p-2 rounded overflow-auto">
                  {JSON.stringify(props, null, 2)}
                </pre>
              </div>
            )}
          </div>
          
          <button
            onClick={() => console.log('Debug Info:', debugInfo)}
            className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
          >
            Log to Console
          </button>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;


