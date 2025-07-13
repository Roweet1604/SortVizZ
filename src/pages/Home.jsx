import { Play } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlgorithmSelect from '../components/AlgorithmSelect';
import Button from '../components/Buttons';
import FileUpload from '../components/FileUpload';
import InputField from '../components/InputField';
import RandomGenerator from '../components/RandomGenerator';
import { useSortContext } from '../contexts/SortContext';

const Home = () => {
  const navigate = useNavigate();
  const { numbers, setNumbers, algorithm, setAlgorithm } = useSortContext();
  const [errors, setErrors] = useState('');

  const handleSubmit = () => {
    if (numbers.length === 0) {
      setErrors('Please enter some numbers to sort');
      return;
    }
    if (!algorithm) {
      setErrors('Please select a sorting algorithm');
      return;
    }
    if (numbers.length > 100) {
      setErrors('Maximum 100 numbers allowed for optimal visualization');
      return;
    }

    setErrors('');
    navigate('/visualize', { state: { numbers, algorithm } });
  };

  const handleNumbersChange = (newNumbers) => {
    setNumbers(newNumbers);
    setErrors('');
  };

  const isValid = numbers.length > 0 && algorithm && numbers.length <= 100;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
          Welcome to SortVizZ
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Learn sorting algorithms through interactive visualization. Enter your numbers, 
          choose an algorithm, and watch how it works step by step.
        </p>
      </div>

      {/* Input Methods */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6 bg-white/60 backdrop-blur-sm dark:bg-gray-800/60 rounded-2xl p-6 border border-indigo-100 dark:border-gray-700 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <span>Enter Your Numbers</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Choose any method below to input your numbers
          </p>

          <div className="space-y-4">
            <InputField onNumbersChange={handleNumbersChange} />

            {/* Quick Input Methods */}
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Quick input methods:</p>
              <div className="flex flex-wrap gap-3">
                <FileUpload onNumbersChange={handleNumbersChange} />
              </div>
            </div>

            <div className="flex items-center space-x-3 my-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full border">or generate</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
            </div>

            <RandomGenerator onNumbersChange={handleNumbersChange} />
          </div>
        </div>

        {/* Algorithm Selection */}
        <div className="space-y-6 bg-white/60 backdrop-blur-sm dark:bg-gray-800/60 rounded-2xl p-6 border border-indigo-100 dark:border-gray-700 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <span>Choose Algorithm</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Select a sorting algorithm to visualize
          </p>
          <AlgorithmSelect value={algorithm} onChange={setAlgorithm} />

          {numbers.length > 0 && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-indigo-200 dark:border-gray-600">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Ready to Sort</span>
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-300 max-h-32 overflow-y-auto font-mono bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                {numbers.slice(0, 20).join(', ')}
                {numbers.length > 20 && '...'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Errors */}
      {errors && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 shadow-lg">
          <p className="text-red-600 dark:text-red-400 text-sm font-medium">{errors}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="px-10 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
          variant="primary"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Visualization
        </Button>
      </div>
    </div>
  );
};

export default Home;
