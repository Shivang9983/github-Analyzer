import React, { useState } from 'react';

export default function SettingsModal({ isOpen, onClose, token, onSaveToken, onClearCache }) {
  const [inputToken, setInputToken] = useState(token);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveToken(inputToken);
    setSuccessMsg('Token saved successfully!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1500);
  };

  const handleClearCache = () => {
    onClearCache();
    setSuccessMsg('Cache cleared successfully!');
    setTimeout(() => {
      setSuccessMsg('');
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Configuration Settings</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close settings">
            &times;
          </button>
        </div>

        <form onSubmit={handleSave} className="modal-body">
          <div className="form-group">
            <label htmlFor="pat-token">GitHub Personal Access Token (PAT)</label>
            <input
              type="password"
              id="pat-token"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              autoComplete="off"
            />
            <p className="help-text">
              Providing a PAT increases your rate limit from 60 requests/hr to 5,000 requests/hr.
              Your token is stored safely in your browser's LocalStorage and is sent directly to GitHub.
            </p>
            <p className="help-text">
              <a
                href="https://github.com/settings/tokens/new?description=GitHub%20Analyzer&scopes="
                target="_blank"
                rel="noreferrer"
                className="external-link"
              >
                Create a new token on GitHub (no scopes needed for public profiles)
              </a>
            </p>
          </div>

          {successMsg && <div className="success-toast">{successMsg}</div>}

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={handleClearCache}>
              Clear Cache
            </button>
            <div className="right-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
