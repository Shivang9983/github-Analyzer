import React, { useState, useEffect } from 'react';
import { sanitizeUsername } from '../utils/formatters';

export default function SearchBar({ initialUsername, onSearch, loading }) {
  const [username, setUsername] = useState(initialUsername || '');
  const [validationError, setValidationError] = useState('');

  // Sync state if initialUsername changes externally
  useEffect(() => {
    setUsername(initialUsername || '');
  }, [initialUsername]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanUsername = sanitizeUsername(username);

    if (!cleanUsername) {
      setValidationError('Please enter a username.');
      return;
    }

    // GitHub username validation rules
    // - May only contain alphanumeric characters or hyphens.
    // - Cannot start or end with a hyphen.
    // - Cannot contain consecutive hyphens.
    // - Max length 39 characters.
    if (cleanUsername.startsWith('-') || cleanUsername.endsWith('-')) {
      setValidationError('Username cannot start or end with a hyphen.');
      return;
    }

    if (cleanUsername.includes('--')) {
      setValidationError('Username cannot contain consecutive hyphens.');
      return;
    }

    if (cleanUsername.length > 39) {
      setValidationError('Username cannot exceed 39 characters.');
      return;
    }

    setValidationError('');
    onSearch(cleanUsername);
  };

  const handleClear = () => {
    setUsername('');
    setValidationError('');
  };

  return (
    <div className="search-section">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="search-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <input
            type="text"
            placeholder="Search GitHub username (e.g. torvalds)..."
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (validationError) setValidationError('');
            }}
            disabled={loading}
            aria-invalid={!!validationError}
            aria-describedby={validationError ? "search-error" : undefined}
          />

          {username && !loading && (
            <button
              type="button"
              className="clear-input-btn"
              onClick={handleClear}
              aria-label="Clear input"
            >
              &times;
            </button>
          )}
        </div>

        <button type="submit" disabled={loading || !username.trim()} className="search-btn">
          {loading ? (
            <span className="spinner-small" aria-hidden="true"></span>
          ) : (
            'Analyze'
          )}
        </button>
      </form>

      {validationError && (
        <p id="search-error" className="validation-error-text" role="alert">
          {validationError}
        </p>
      )}
    </div>
  );
}
