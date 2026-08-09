import React from 'react';
import { formatDate, formatNumber } from '../utils/formatters';

export default function ProfileSummary({ profile }) {
  if (!profile) return null;

  const {
    avatar_url,
    name,
    login,
    bio,
    created_at,
    location,
    blog,
    company,
    twitter_username,
    followers,
    following,
    public_repos,
    html_url,
  } = profile;

  // Format blog URL if it doesn't have protocol
  const formattedBlog = blog && !/^https?:\/\//i.test(blog) ? `https://${blog}` : blog;

  return (
    <div className="profile-card">
      <div className="profile-header-main">
        <img src={avatar_url} alt={`${name || login}'s avatar`} className="avatar" />
        <h2>{name || login}</h2>
        <span className="username">@{login}</span>
        {created_at && <span className="join-date">{formatDate(created_at)}</span>}
      </div>

      <p className="bio">{bio || 'This user has no bio.'}</p>

      {/* Meta info list */}
      <div className="meta-info-list">
        {company && (
          <div className="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meta-icon">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            <span className="meta-text" title={company}>{company}</span>
          </div>
        )}

        {location && (
          <div className="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meta-icon">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span className="meta-text" title={location}>{location}</span>
          </div>
        )}

        {blog && (
          <div className="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meta-icon">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <a
              href={formattedBlog}
              target="_blank"
              rel="noreferrer"
              className="meta-link"
              title={blog}
            >
              {blog}
            </a>
          </div>
        )}

        {twitter_username && (
          <div className="meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="meta-icon">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
            <a
              href={`https://twitter.com/${twitter_username}`}
              target="_blank"
              rel="noreferrer"
              className="meta-link"
            >
              @{twitter_username}
            </a>
          </div>
        )}
      </div>

      <div className="stats">
        <div className="stat-item">
          <b>{formatNumber(public_repos)}</b>
          <span>Repos</span>
        </div>
        <div className="stat-item">
          <b>{formatNumber(followers)}</b>
          <span>Followers</span>
        </div>
        <div className="stat-item">
          <b>{formatNumber(following)}</b>
          <span>Following</span>
        </div>
      </div>

      <a href={html_url} target="_blank" rel="noreferrer" className="view-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
        Visit GitHub Profile
      </a>
    </div>
  );
}
