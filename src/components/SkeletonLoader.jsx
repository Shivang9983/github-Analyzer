import React from 'react';

export function ProfileSkeleton() {
  return (
    <div className="profile-card skeleton-card">
      <div className="skeleton-avatar loading-shimmer"></div>
      <div className="skeleton-line skeleton-title loading-shimmer"></div>
      <div className="skeleton-line skeleton-subtitle loading-shimmer"></div>
      <div className="skeleton-line skeleton-text loading-shimmer" style={{ width: '80%', margin: '15px auto 25px' }}></div>
      <div className="stats" style={{ borderTop: 'none', paddingTop: 0 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="stat-item">
            <div className="skeleton-line skeleton-stat-num loading-shimmer"></div>
            <div className="skeleton-line skeleton-stat-label loading-shimmer"></div>
          </div>
        ))}
      </div>
      <div className="skeleton-btn loading-shimmer"></div>
    </div>
  );
}

export function RepoSkeleton() {
  return (
    <div className="repo-card skeleton-card">
      <div className="skeleton-line skeleton-repo-title loading-shimmer"></div>
      <div className="skeleton-line skeleton-repo-desc loading-shimmer"></div>
      <div className="skeleton-line skeleton-repo-desc loading-shimmer" style={{ width: '60%' }}></div>
      <div className="repo-footer" style={{ marginTop: '15px', display: 'flex', gap: '15px' }}>
        <div className="skeleton-line skeleton-badge loading-shimmer"></div>
        <div className="skeleton-line skeleton-badge loading-shimmer"></div>
        <div className="skeleton-line skeleton-badge loading-shimmer"></div>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="chart-card skeleton-card" style={{ padding: '30px 20px', borderRadius: '16px' }}>
      <div className="skeleton-line skeleton-title loading-shimmer" style={{ width: '40%', margin: '0 0 20px 0' }}></div>
      <div className="skeleton-chart-bar-container">
        <div className="skeleton-chart-bar loading-shimmer"></div>
      </div>
      <div className="skeleton-chart-legends">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-legend-item">
            <div className="skeleton-dot loading-shimmer"></div>
            <div className="skeleton-line skeleton-badge loading-shimmer" style={{ width: '50px' }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="dashboard-grid">
      <div className="sidebar">
        <ProfileSkeleton />
      </div>
      <div className="main-content">
        <ChartSkeleton />
        <div style={{ marginTop: '30px' }}>
          <div className="skeleton-line skeleton-title loading-shimmer" style={{ width: '30%', marginBottom: '20px' }}></div>
          <div className="repos-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <RepoSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
