import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { SortProvider } from './contexts/SortContext';
import './index.css';
import Home from './pages/Home';
import Visualize from './pages/Visualize';

function App() {
  return (
    <SortProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/visualize" element={<Visualize />} />
            </Routes>
          </main>
        </div>
      </Router>
    </SortProvider>
  );
}

export default App;