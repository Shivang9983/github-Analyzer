import React from 'react';

export default function SearchHistory({ history, onSelectTag, onRemoveTag, onClearHistory }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="search-history-container">
      <div className="history-header">
        <span className="history-title">Recent Searches</span>
        <button className="clear-history-link" onClick={onClearHistory}>
          Clear All
        </button>
      </div>

      <div className="history-tags-list">
        {history.map((name) => (
          <div key={name} className="history-tag-wrapper">
            <span
              className="history-tag-name"
              onClick={() => onSelectTag(name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectTag(name);
                }
              }}
            >
              {name}
            </span>
            <button
              type="button"
              className="remove-tag-btn"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveTag(name);
              }}
              aria-label={`Remove ${name} from history`}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
