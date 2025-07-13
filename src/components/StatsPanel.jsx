import { ArrowUpDown, BarChart, Clock, Shuffle } from 'lucide-react';
import { useSortContext } from '../contexts/SortContext';

const StatsPanel = () => {
  const { stats, currentStep, steps } = useSortContext();

  const currentStats = steps[currentStep] ? {
    comparisons: steps.slice(0, currentStep + 1).filter(step => step.type === 'compare').length,
    swaps: steps.slice(0, currentStep + 1).filter(step => step.type === 'swap').length,
    time: stats.time
  } : { comparisons: 0, swaps: 0, time: 0 };

  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl shadow-xl border border-indigo-100 dark:border-gray-700 p-6 space-y-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <BarChart className="w-3 h-3 text-white" />
        </div>
        <span>Statistics</span>
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
              <BarChart className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">Comparisons</span>
          </div>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {currentStats.comparisons.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-center">
              <ArrowUpDown className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">Swaps</span>
          </div>
          <span className="text-xl font-bold text-green-600 dark:text-green-400">
            {currentStats.swaps.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">Time Complexity</span>
          </div>
          <span className="text-sm font-bold text-orange-600 dark:text-orange-400 font-mono bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-lg">
            O(n²)
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Shuffle className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">Space Complexity</span>
          </div>
          <span className="text-sm font-bold text-purple-600 dark:text-purple-400 font-mono bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded-lg">
            O(1)
          </span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-indigo-100 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Color Legend</h4>
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-amber-500 rounded-lg shadow-sm"></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-lg shadow-sm"></div>
            <span>Swapping</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-emerald-500 rounded-lg shadow-sm"></div>
            <span>Sorted</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-violet-500 rounded-lg shadow-sm"></div>
            <span>Pivot</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;