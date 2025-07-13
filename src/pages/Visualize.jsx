import { useEffect, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AlgorithmInfo from '../components/AlgorithmInfo';
import ControlPanel from '../components/ControlPanel';
import SortCanvas from '../components/SortCanvas';
import StatsPanel from '../components/StatsPanel';
import { useSortContext } from '../contexts/SortContext';
import { useSortVisualizer } from '../hooks/useSortVisualizer';

const Visualize = () => {
  const location = useLocation();
  const { numbers, setNumbers, algorithm, setAlgorithm } = useSortContext();
  const initialized = useRef(false);

  // Initialize from location state if available
  useEffect(() => {
    if (location.state && !initialized.current) {
      const { numbers: stateNumbers, algorithm: stateAlgorithm } = location.state;
      if (stateNumbers && stateAlgorithm) {
        setNumbers(stateNumbers);
        setAlgorithm(stateAlgorithm);
        initialized.current = true;
      }
    }
  }, [location.state, setNumbers, setAlgorithm]);

  const { initializeVisualization } = useSortVisualizer();

  // Initialize visualization when data is ready
  useEffect(() => {
    if (numbers.length > 0 && algorithm) {
      initializeVisualization(numbers, algorithm);
    }
  }, [numbers, algorithm, initializeVisualization]);

  // Redirect if no data
  if (!numbers.length || !algorithm) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
          {algorithm} Sort Visualization
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Sorting {numbers.length} numbers
        </p>
      </div>

      {/* Visualization Area */}
      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <SortCanvas />
        </div>
        <div className="space-y-8">
          <ControlPanel />
          <StatsPanel />
        </div>
      </div>
      
      {/* Algorithm Information */}
      <AlgorithmInfo algorithm={algorithm} />
    </div>
  );
};

export default Visualize;