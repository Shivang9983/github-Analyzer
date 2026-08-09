import { useState, useEffect, useCallback } from 'react';

const CACHE_PREFIX = 'github_analyzer_cache_';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

export function useGitHubData() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rateLimit, setRateLimit] = useState(() => {
    const saved = localStorage.getItem('github_analyzer_ratelimit');
    return saved ? JSON.parse(saved) : { limit: 60, remaining: 60, reset: null };
  });

  const [token, setTokenState] = useState(() => {
    return localStorage.getItem('github_analyzer_token') || '';
  });

  // Save rate limit to local storage for persistence across tabs/reloads
  useEffect(() => {
    localStorage.setItem('github_analyzer_ratelimit', JSON.stringify(rateLimit));
  }, [rateLimit]);

  const setToken = useCallback((newToken) => {
    const trimmed = (newToken || '').trim();
    if (trimmed) {
      localStorage.setItem('github_analyzer_token', trimmed);
    } else {
      localStorage.removeItem('github_analyzer_token');
    }
    setTokenState(trimmed);
  }, []);

  const updateRateLimit = useCallback((headers) => {
    const limit = headers.get('x-ratelimit-limit');
    const remaining = headers.get('x-ratelimit-remaining');
    const reset = headers.get('x-ratelimit-reset');
    if (limit && remaining) {
      setRateLimit({
        limit: parseInt(limit, 10),
        remaining: parseInt(remaining, 10),
        reset: reset ? parseInt(reset, 10) * 1000 : null,
      });
    }
  }, []);

  const fetchUser = useCallback(async (username) => {
    if (!username) return null;

    const cacheKey = `${CACHE_PREFIX}${username.toLowerCase()}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      try {
        const { profileData, reposData, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_TTL_MS) {
          setProfile(profileData);
          setRepos(reposData);
          setError(null);
          return { profile: profileData, repos: reposData };
        }
      } catch (e) {
        sessionStorage.removeItem(cacheKey);
      }
    }

    setLoading(true);
    setError(null);

    const headers = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    try {
      // 1. Fetch Profile
      const profileRes = await fetch(`https://api.github.com/users/${username}`, { headers });
      updateRateLimit(profileRes.headers);

      if (profileRes.status === 404) {
        throw new Error('User not found!');
      } else if (profileRes.status === 401 || profileRes.status === 403) {
        const body = await profileRes.json().catch(() => ({}));
        if (body.message && body.message.includes('rate limit')) {
          throw new Error('GitHub API rate limit exceeded. Please configure a Personal Access Token in Settings to continue.');
        }
        throw new Error(body.message || 'Access denied or invalid API Token.');
      } else if (!profileRes.ok) {
        throw new Error(`Failed to fetch profile (Status: ${profileRes.status})`);
      }

      const profileData = await profileRes.json();

      // 2. Fetch Repos (fetch top 100 repos sorted by updated)
      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        { headers }
      );
      updateRateLimit(reposRes.headers);

      let reposData = [];
      if (reposRes.ok) {
        reposData = await reposRes.json();
      }

      // Store in states
      setProfile(profileData);
      setRepos(reposData);

      // Store in Session Cache
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({
          profileData,
          reposData,
          timestamp: Date.now(),
        })
      );

      return { profile: profileData, repos: reposData };
    } catch (err) {
      setError(err.message);
      setProfile(null);
      setRepos([]);
      return null;
    } finally {
      setLoading(false);
    }
  }, [token, updateRateLimit]);

  return {
    profile,
    repos,
    loading,
    error,
    rateLimit,
    token,
    setToken,
    fetchUser,
  };
}
