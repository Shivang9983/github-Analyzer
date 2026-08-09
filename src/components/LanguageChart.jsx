import React from 'react';

// Color map for common languages
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
  Objective_C: '#438eff',
  R: '#198CE7',
  Scala: '#c22d40',
};

const DEFAULT_COLORS = [
  '#2b7489',
  '#4a5568',
  '#718096',
  '#a0aec0',
  '#cbd5e0',
];

export default function LanguageChart({ repos }) {
  if (!repos || repos.length === 0) return null;

  // 1. Accumulate languages
  const languageCounts = {};
  let totalWithLanguage = 0;

  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      totalWithLanguage++;
    }
  });

  if (totalWithLanguage === 0) {
    return (
      <div className="chart-card">
        <h3>Language Breakdown</h3>
        <p className="no-languages-text">No language statistics available for this user's repositories.</p>
      </div>
    );
  }

  // 2. Sort and convert to percentage array
  const sortedLanguages = Object.entries(languageCounts)
    .map(([lang, count]) => {
      const percentage = (count / totalWithLanguage) * 100;
      return {
        name: lang,
        count,
        percentage: parseFloat(percentage.toFixed(1)),
        color: LANGUAGE_COLORS[lang] || DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],
      };
    })
    .sort((a, b) => b.count - a.count);

  // Limit to top 5, rest is grouped in "Other"
  let displayLanguages = [];
  if (sortedLanguages.length > 5) {
    displayLanguages = sortedLanguages.slice(0, 5);
    const otherCount = sortedLanguages.slice(5).reduce((sum, item) => sum + item.count, 0);
    const otherPercentage = parseFloat(((otherCount / totalWithLanguage) * 100).toFixed(1));
    displayLanguages.push({
      name: 'Other',
      count: otherCount,
      percentage: otherPercentage,
      color: '#cbd5e1', // Slate/grey
    });
  } else {
    displayLanguages = sortedLanguages;
  }

  return (
    <div className="chart-card">
      <h3>Language Breakdown</h3>

      {/* Progress Bar Row */}
      <div className="lang-bar-container">
        {displayLanguages.map((lang, index) => (
          <div
            key={lang.name}
            className="lang-bar-segment"
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: lang.color,
            }}
            title={`${lang.name}: ${lang.percentage}% (${lang.count} repos)`}
          />
        ))}
      </div>

      {/* Legend Grid */}
      <div className="lang-legends">
        {displayLanguages.map((lang) => (
          <div key={lang.name} className="legend-item">
            <span className="legend-color-dot" style={{ backgroundColor: lang.color }} />
            <span className="legend-lang-name">{lang.name}</span>
            <span className="legend-lang-percentage">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
