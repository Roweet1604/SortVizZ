import { BookOpen, Clock, Database, Zap } from 'lucide-react';

const algorithmData = {
  bubble: {
    name: 'Bubble Sort',
    description: 'A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    howItWorks: [
      'Compare adjacent elements in the array',
      'Swap them if they are in the wrong order',
      'Continue through the array until no swaps are needed',
      'The largest element "bubbles up" to its correct position each pass'
    ],
    advantages: [
      'Simple to understand and implement',
      'No additional memory space needed',
      'Stable sorting algorithm',
      'Can detect if the list is already sorted'
    ],
    disadvantages: [
      'Poor performance on large datasets',
      'More swaps compared to other algorithms',
      'Not suitable for real-world applications'
    ]
  },
  selection: {
    name: 'Selection Sort',
    description: 'An in-place comparison sorting algorithm that divides the input list into sorted and unsorted regions, repeatedly selecting the smallest element from the unsorted region.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    howItWorks: [
      'Find the minimum element in the unsorted portion',
      'Swap it with the first element of the unsorted portion',
      'Move the boundary between sorted and unsorted portions',
      'Repeat until the entire array is sorted'
    ],
    advantages: [
      'Simple implementation',
      'In-place sorting (O(1) space)',
      'Minimizes the number of swaps',
      'Performance is not affected by initial order'
    ],
    disadvantages: [
      'Poor performance on large datasets',
      'Not stable (relative order may change)',
      'Always performs O(n²) comparisons'
    ]
  },
  insertion: {
    name: 'Insertion Sort',
    description: 'A simple sorting algorithm that builds the final sorted array one item at a time, similar to how you might sort playing cards in your hands.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    howItWorks: [
      'Start with the second element (first is considered sorted)',
      'Compare it with elements in the sorted portion',
      'Shift larger elements to the right',
      'Insert the current element in its correct position'
    ],
    advantages: [
      'Efficient for small datasets',
      'Adaptive (performs well on nearly sorted data)',
      'Stable and in-place',
      'Online (can sort a list as it receives it)'
    ],
    disadvantages: [
      'Inefficient for large datasets',
      'More writes compared to selection sort',
      'O(n²) time complexity in worst case'
    ]
  },
  merge: {
    name: 'Merge Sort',
    description: 'A divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    howItWorks: [
      'Divide the array into two halves',
      'Recursively sort both halves',
      'Merge the two sorted halves back together',
      'Continue until the entire array is sorted'
    ],
    advantages: [
      'Guaranteed O(n log n) time complexity',
      'Stable sorting algorithm',
      'Predictable performance',
      'Works well for large datasets'
    ],
    disadvantages: [
      'Requires O(n) additional space',
      'Not in-place sorting',
      'Slower for small datasets due to overhead'
    ]
  },
  quick: {
    name: 'Quick Sort',
    description: 'A highly efficient divide-and-conquer algorithm that picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    howItWorks: [
      'Choose a pivot element from the array',
      'Partition the array so elements smaller than pivot are on the left',
      'Elements greater than pivot are placed on the right',
      'Recursively apply the same process to sub-arrays'
    ],
    advantages: [
      'Very efficient for large datasets',
      'In-place sorting (low memory usage)',
      'Cache-efficient due to good locality',
      'Widely used in practice'
    ],
    disadvantages: [
      'Worst-case O(n²) performance',
      'Not stable',
      'Performance depends on pivot selection',
      'Can be slow on already sorted data'
    ]
  }
};

const AlgorithmInfo = ({ algorithm }) => {
  const info = algorithmData[algorithm];
  
  if (!info) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl shadow-xl border border-indigo-100 dark:border-gray-700 p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {info.name} Algorithm
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Description and How it Works */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Description
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {info.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              How It Works
            </h3>
            <ol className="space-y-2">
              {info.howItWorks.map((step, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Complexity and Characteristics */}
        <div className="space-y-6">
          {/* Time Complexity */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Time Complexity
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="text-center">
                <div className="text-gray-500 dark:text-gray-400 mb-1">Best</div>
                <div className="font-mono font-bold text-green-600 dark:text-green-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                  {info.timeComplexity.best}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 dark:text-gray-400 mb-1">Average</div>
                <div className="font-mono font-bold text-yellow-600 dark:text-yellow-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                  {info.timeComplexity.average}
                </div>
              </div>
              <div className="text-center">
                <div className="text-gray-500 dark:text-gray-400 mb-1">Worst</div>
                <div className="font-mono font-bold text-red-600 dark:text-red-400 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                  {info.timeComplexity.worst}
                </div>
              </div>
            </div>
          </div>

          {/* Space Complexity */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center space-x-2 mb-3">
              <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Space Complexity
              </h3>
            </div>
            <div className="font-mono font-bold text-purple-600 dark:text-purple-400 bg-white dark:bg-gray-800 px-3 py-2 rounded text-center">
              {info.spaceComplexity}
            </div>
          </div>

          {/* Advantages and Disadvantages */}
          <div className="grid gap-4">
            <div>
              <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2 flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Advantages</span>
              </h4>
              <ul className="space-y-1 text-sm">
                {info.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                Disadvantages
              </h4>
              <ul className="space-y-1 text-sm">
                {info.disadvantages.map((disadvantage, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">{disadvantage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInfo;