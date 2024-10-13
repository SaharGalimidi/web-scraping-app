import React, { useState, useEffect } from 'react';
import ScrapeForm from './components/ScrapeForm';
import ResultsList from './components/ResultsList';
import './index.css';
import axios from 'axios';

/**
 * Interface defining the structure of a scraping result.
 */
interface Result {
  _id: string;
  url: string;
  date: string;
  domainCount: number;
  urlCount: number;
}

/**
 * The main App component that manages the state and passes props to child components.
 */
const App: React.FC = () => {
  /**
   * State variable 'results' holds the array of scraping results.
   */
  const [results, setResults] = useState<Result[]>([]);

  /**
   * Function to fetch results from the backend and update the state.
   */
  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:3000/scrape');
      setResults(response.data);
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching results.');
    }
  };

  /**
   * useEffect hook to fetch results when the component mounts.
   */
  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="app-container">
      <h1>Web Scraping Application</h1>
      {/* Pass fetchResults to ScrapeForm */}
      <ScrapeForm fetchResults={fetchResults} />
      {/* Pass results and fetchResults to ResultsList */}
      <ResultsList results={results} fetchResults={fetchResults} />
    </div>
  );
};

export default App;
