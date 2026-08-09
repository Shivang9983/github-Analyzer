import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { useGitHubData } from './hooks/useGitHubData';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import ProfileSummary from './components/ProfileSummary';
import LanguageChart from './components/LanguageChart';
import ReposGrid from './components/ReposGrid';
import SettingsModal from './components/SettingsModal';
import { DashboardSkeleton } from './components/SkeletonLoader';

function App() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('github_analyzer_theme');
    return saved || 'dark'; // Default to premium dark mode
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');

  const {
    profile,
    repos,
    loading,
    error,
    rateLimit,
    token,
    setToken,
    fetchUser,
  } = useGitHubData();

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('github_analyzer_theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Perform search and update history if successful
  const handleSearch = useCallback(async (username) => {
    if (!username) return;
    setCurrentSearch(username);

    const result = await fetchUser(username);
    if (result) {
      setHistory((prevHistory) => {
        const updated = [
          username,
          ...prevHistory.filter((name) => name.toLowerCase() !== username.toLowerCase()),
        ].slice(0, 5);
        localStorage.setItem('searchHistory', JSON.stringify(updated));
        return updated;
      });
    }
  }, [fetchUser]);

  const handleSelectHistoryTag = (name) => {
    handleSearch(name);
  };

  const handleRemoveHistoryTag = (nameToRemove) => {
    setHistory((prevHistory) => {
      const updated = prevHistory.filter((name) => name !== nameToRemove);
      localStorage.setItem('searchHistory', JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleClearCache = () => {
    // Clear all keys starting with cache prefix
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith('github_analyzer_cache_')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  return (
    <div className="app-wrapper">
      <Navbar
        rateLimit={rateLimit}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="container">
        <header className="hero-section">
          <h1>GitHub Profile Analyzer</h1>
          <p className="hero-subtitle">
            Search a GitHub user profile to generate instant insights on repositories, language statistics, and contribution statistics.
          </p>
        </header>

        <SearchBar
          initialUsername={currentSearch}
          onSearch={handleSearch}
          loading={loading}
        />

        <SearchHistory
          history={history}
          onSelectTag={handleSelectHistoryTag}
          onRemoveTag={handleRemoveHistoryTag}
          onClearHistory={handleClearHistory}
        />

        {error && (
          <div className="error-card" role="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="error-icon"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h3>Unable to Retrieve Data</h3>
            <p>{error}</p>
          </div>
        )}

        {loading && <DashboardSkeleton />}

        {profile && !loading && !error && (
          <div className="dashboard-grid">
            <aside className="sidebar">
              <ProfileSummary profile={profile} />
            </aside>
            <section className="main-content">
              <LanguageChart repos={repos} />
              <ReposGrid repos={repos} />
            </section>
          </div>
        )}

        {!profile && !loading && !error && (
          <div className="empty-state-card">
            <div className="empty-state-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
              </svg>
            </div>
            <h3>Discover Developers</h3>
            <p>Type a GitHub username above to analyze their language profile, top repositories, and social network statistics.</p>
          </div>
        )}
      </main>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        token={token}
        onSaveToken={setToken}
        onClearCache={handleClearCache}
      />
    </div>
  );
}

export default App;