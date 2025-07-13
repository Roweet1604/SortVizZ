import { ChevronDown } from 'lucide-react';

const algorithms = [
  { value: 'bubble', label: 'Bubble Sort', description: 'Simple comparison-based algorithm' },
  { value: 'selection', label: 'Selection Sort', description: 'Finds minimum element repeatedly' },
  { value: 'insertion', label: 'Insertion Sort', description: 'Builds sorted array one item at a time' },
  { value: 'merge', label: 'Merge Sort', description: 'Divide and conquer approach' },
  { value: 'quick', label: 'Quick Sort', description: 'Efficient pivot-based sorting' },
  { value: 'heap', label: 'Heap Sort', description: 'Uses binary heap data structure' },
  { value: 'counting', label: 'Counting Sort', description: 'Non-comparison based sorting' },
  { value: 'radix', label: 'Radix Sort', description: 'Sorts by individual digits' },
  { value: 'bucket', label: 'Bucket Sort', description: 'Distributes elements into buckets' },
];

const AlgorithmSelect = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        Sorting Algorithm
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 pr-10 border-2 border-indigo-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100 appearance-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
        >
          <option value="">Select an algorithm...</option>
          {algorithms.map((algo) => (
            <option key={algo.value} value={algo.value}>
              {algo.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {value && (
        <div className="bg-indigo-50 dark:bg-gray-700 rounded-lg p-3 border border-indigo-200 dark:border-gray-600">
          <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">
          {algorithms.find(a => a.value === value)?.description}
        </p>
        </div>
      )}
    </div>
  );
};

export default AlgorithmSelect;