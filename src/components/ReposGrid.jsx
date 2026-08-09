import React, { useState, useEffect, useMemo } from 'react';
import { formatNumber, formatSize } from '../utils/formatters';

const ITEMS_PER_PAGE = 6;

// Import language colors to match chart colors
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Shell: '#89e051',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
};

export default function ReposGrid({ repos }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('stars'); // stars, forks, size, updated
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when search or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  const filteredAndSortedRepos = useMemo(() => {
    let result = [...repos];

    // Filter by name or language
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (repo) =>
          repo.name.toLowerCase().includes(query) ||
          (repo.language && repo.language.toLowerCase().includes(query))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      }
      if (sortBy === 'forks') {
        return b.forks_count - a.forks_count;
      }
      if (sortBy === 'size') {
        return b.size - a.size;
      }
      if (sortBy === 'updated') {
        return new Date(b.updated_at) - new Date(a.updated_at);
      }
      return 0;
    });

    return result;
  }, [repos, searchTerm, sortBy]);

  // Pagination calculations
  const totalItems = filteredAndSortedRepos.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRepos = filteredAndSortedRepos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="repos-container">
      <div className="repos-header">
        <h3>Repositories ({totalItems})</h3>
        
        <div className="repos-controls">
          {/* Search Input */}
          <div className="filter-input-wrapper">
            <input
              type="text"
              placeholder="Filter repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="repo-search-input"
            />
          </div>

          {/* Sort Selector */}
          <div className="sort-wrapper">
            <label htmlFor="repo-sort-select" className="sr-only">Sort by</label>
            <select
              id="repo-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="repo-sort-select"
            >
              <option value="stars">Sort by Stars</option>
              <option value="forks">Sort by Forks</option>
              <option value="updated">Sort by Updated</option>
              <option value="size">Sort by Size</option>
            </select>
          </div>
        </div>
      </div>

      {paginatedRepos.length === 0 ? (
        <div className="no-repos-card">
          <p>No repositories match your filter query.</p>
        </div>
      ) : (
        <div className="repos-grid">
          {paginatedRepos.map((repo) => (
            <div key={repo.id} className="repo-card">
              <div className="repo-card-header">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-name-link"
                >
                  {repo.name}
                </a>
                {repo.fork && <span className="fork-badge">Fork</span>}
              </div>

              <p className="repo-desc">
                {repo.description || 'No description provided.'}
              </p>

              <div className="repo-footer">
                {repo.language && (
                  <span className="repo-lang">
                    <span
                      className="lang-dot"
                      style={{
                        backgroundColor: LANGUAGE_COLORS[repo.language] || '#cbd5e1',
                      }}
                    />
                    {repo.language}
                  </span>
                )}

                <span className="repo-stat" title="Stars">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="stat-icon-svg">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  {formatNumber(repo.stargazers_count)}
                </span>

                <span className="repo-stat" title="Forks">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="stat-icon-svg">
                    <line x1="6" y1="3" x2="6" y2="15"></line>
                    <circle cx="18" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M18 9a9 9 0 0 1-9 9"></path>
                  </svg>
                  {formatNumber(repo.forks_count)}
                </span>

                <span className="repo-size" title="Size">
                  {formatSize(repo.size)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            &larr; Prev
          </button>
          <span className="page-indicator">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="page-btn"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
