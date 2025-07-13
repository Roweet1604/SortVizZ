import { createContext, useContext, useState } from 'react';

const SortContext = createContext(undefined);

export const useSortContext = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error('useSortContext must be used within a SortProvider');
  }
  return context;
};

export const SortProvider = ({ children }) => {
  const [numbers, setNumbers] = useState([]);
  const [algorithm, setAlgorithm] = useState('');
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, time: 0 });

  return (
    <SortContext.Provider
      value={{
        numbers,
        setNumbers,
        algorithm,
        setAlgorithm,
        steps,
        setSteps,
        currentStep,
        setCurrentStep,
        isPlaying,
        setIsPlaying,
        speed,
        setSpeed,
        stats,
        setStats,
      }}
    >
      {children}
    </SortContext.Provider>
  );
};