import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
} else {
  console.error("Root container missing in HTML.");
}