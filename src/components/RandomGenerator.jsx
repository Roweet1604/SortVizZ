import { Shuffle } from 'lucide-react';
import { useState } from 'react';
import Button from './Buttons';

const RandomGenerator = ({ onNumbersChange }) => {
  const [count, setCount] = useState(10);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);

  const generateRandomNumbers = () => {
    const numbers = Array.from({ length: count }, () => 
      Math.floor(Math.random() * (max - min + 1)) + min
    );
    onNumbersChange(numbers);
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 dark:text-slate-300">
        <Shuffle className="w-4 h-4" />
        <span>Random Generator</span>
      </label>
      
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Count</label>
          <input
            type="number"
            min="3"
            max="50"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Min</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            className="w-full px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Max</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="w-full px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-800 dark:text-slate-100"
          />
        </div>
      </div>
      
      <Button onClick={generateRandomNumbers} variant="outline" className="w-full">
        <Shuffle className="w-4 h-4 mr-2" />
        Generate Random Numbers
      </Button>
    </div>
  );
};

export default RandomGenerator;