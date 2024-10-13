import React from 'react';

interface Result {
  _id: string;
  url: string;
  date: string;
  domainCount: number;
  urlCount: number;
}

interface ResultsListProps {
  results: Result[];
  fetchResults: () => void;
}

/**
 * The ResultsList component displays a list of scraping results.
 */
const ResultsList: React.FC<ResultsListProps> = ({ results, fetchResults }) => {
  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Scraping Results</h2>
        <button onClick={fetchResults}>Refresh</button>
      </div>
      <div>
        {results.map((result) => (
          <div key={result._id} className="result-item">
            <p>
              <strong>URL:</strong> {result.url}
            </p>
            <p>
              <strong>Date:</strong> {new Date(result.date).toLocaleString()}
            </p>
            <p>
              <strong>Domains Found:</strong> {result.domainCount}
            </p>
            <p>
              <strong>URLs Found:</strong> {result.urlCount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsList;
