import React from 'react';
import { AlertCircle, RefreshCw, Key, ShieldAlert } from 'lucide-react';

export default function ErrorState({ error, onRetry, isApiKeyMissing }) {
  const isRateLimit = error?.status === 429 || error?.code === 'RATE_LIMIT';

  return (
    <div className="error-card" role="alert">
      <div className="error-icon-wrapper">
        {isApiKeyMissing ? (
          <Key className="error-icon" size={36} />
        ) : isRateLimit ? (
          <ShieldAlert className="error-icon" size={36} />
        ) : (
          <AlertCircle className="error-icon" size={36} />
        )}
      </div>

      <h3 className="error-title">
        {isApiKeyMissing
          ? 'Unsplash API Key Required'
          : isRateLimit
          ? 'API Rate Limit Reached'
          : 'Unable to Load Images'}
      </h3>

      <p className="error-message">
        {error?.message ||
          'A temporary network or server error occurred while contacting Unsplash.'}
      </p>

      {isApiKeyMissing && (
        <div className="api-setup-help">
          <p className="setup-step-title">How to configure your API key:</p>
          <ol className="setup-steps">
            <li>Register an app at <code>unsplash.com/developers</code></li>
            <li>Create a <code>.env</code> file in your project root</li>
            <li>Add: <code>VITE_UNSPLASH_ACCESS_KEY=your_key_here</code></li>
            <li>Restart your Vite development server</li>
          </ol>
        </div>
      )}

      <button
        type="button"
        onClick={onRetry}
        className="error-retry-btn"
        aria-label="Retry loading images"
      >
        <RefreshCw size={16} aria-hidden="true" />
        <span>Try Again</span>
      </button>
    </div>
  );
}