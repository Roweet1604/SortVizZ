import { Edit3 } from 'lucide-react';
import { useState } from 'react';
import { parseNumbers } from '../utils/parsing/numberParser';

const InputField = ({ onNumbersChange }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleBlur = () => {
    if (!value.trim()) {
      setError('');
      onNumbersChange([]);
      return;
    }

    try {
      const numbers = parseNumbers(value);
      if (numbers.length === 0) {
        setError('No valid numbers found');
        onNumbersChange([]);
      } else if (numbers.length > 100) {
        setError('Maximum 100 numbers allowed');
        onNumbersChange([]);
      } else {
        setError('');
        onNumbersChange(numbers);
      }
    } catch (err) {
      setError('Invalid input format');
      onNumbersChange([]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center space-x-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
          <Edit3 className="w-3 h-3 text-white" />
        </div>
        <span>Manual Input</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        placeholder="Enter numbers separated by commas (e.g., 64, 34, 25, 12, 22, 11, 90)"
        className="w-full px-4 py-3 border-2 border-indigo-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100 transition-all duration-200 bg-white/50 backdrop-blur-sm"
      />
      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm font-medium">{error}</p>
      )}
      <p className="text-gray-500 dark:text-gray-400 text-xs">
        Enter comma-separated numbers. Max 100 numbers for optimal visualization.
      </p>
    </div>
  );
};

export default InputField;