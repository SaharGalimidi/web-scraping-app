// import React, { useState } from 'react';
// import axios from 'axios';

// const ScrapeForm: React.FC = () => {
//   const [url, setUrl] = useState('');

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!url) {
//       alert('Please enter a URL.');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:3000/scrape', { url });
//       alert('Scraping started!');
//       setUrl('');
//     } catch (error) {
//       console.error(error);
//       alert('An error occurred while starting the scraping process.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="url-input">Website URL:</label>
//       <input
//         id="url-input"
//         type="text"
//         value={url}
//         onChange={(event) => setUrl(event.target.value)}
//         placeholder="https://example.com"
//       />
//       <button type="submit">Scrape Website</button>
//     </form>
//   );
// };

// export default ScrapeForm;

// frontend/src/components/ScrapeForm.tsx

import React, { useState } from 'react';
import axios from 'axios';

interface ScrapeFormProps {
  fetchResults: () => void;
}

/**
 * The ScrapeForm component provides a form for users to input a website URL to scrape.
 * It notifies the user when scraping is finished and refreshes the results.
 */
const ScrapeForm: React.FC<ScrapeFormProps> = ({ fetchResults }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading status

  /**
   * Handles the form submission to start the scraping process.
   * @param event - The form submission event.
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!url) {
      alert('Please enter a URL.');
      return;
    }

    try {
      setLoading(true); // Set loading to true when the request starts
      // Send a POST request to the backend to start scraping
      await axios.post('http://localhost:3000/scrape', { url });
      alert('Scraping finished!');
      setUrl(''); // Clear the input field
      fetchResults(); // Refresh the results
    } catch (error) {
      console.error(error);
      alert('An error occurred while starting the scraping process.');
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="url-input">Website URL:</label>
      <input
        id="url-input"
        type="text"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://example.com"
        disabled={loading} // Disable input while loading
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Scraping...' : 'Scrape Website'}
      </button>
    </form>
  );
};

export default ScrapeForm;
