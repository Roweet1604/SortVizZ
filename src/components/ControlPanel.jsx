import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { useSortContext } from '../contexts/SortContext';
import { useSortVisualizer } from '../hooks/useSortVisualizer';
import Button from './Buttons';

const ControlPanel = () => {
  const { 
    steps, 
    currentStep, 
    isPlaying, 
    speed, 
    setSpeed 
  } = useSortContext();
  
  const { 
    play, 
    pause, 
    stepForward, 
    stepBackward, 
    reset 
  } = useSortVisualizer();

  return (
    <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl shadow-xl border border-indigo-100 dark:border-gray-700 p-6 space-y-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Play className="w-3 h-3 text-white" />
        </div>
        <span>Controls</span>
      </h3>
      
      {/* Play/Pause and Step Controls */}
      <div className="flex items-center justify-center space-x-3">
        <Button 
          onClick={stepBackward}
          disabled={currentStep === 0}
          variant="outline"
          size="md"
          className="rounded-full w-12 h-12 p-0"
        >
          <SkipBack className="w-4 h-4" />
        </Button>
        
        <Button
          onClick={isPlaying ? pause : play}
          disabled={steps.length === 0}
          variant="primary"
          className="rounded-full w-14 h-14 p-0 shadow-lg"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        
        <Button
          onClick={stepForward}
          disabled={currentStep >= steps.length - 1}
          variant="outline"
          size="md"
          className="rounded-full w-12 h-12 p-0"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      {/* Reset Button */}
      <Button onClick={reset} variant="outline" className="w-full rounded-xl py-3">
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset
      </Button>

      {/* Speed Control */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Animation Speed: {speed}x
        </label>
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full h-3 bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-gray-700 dark:to-gray-600 rounded-full appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>0.1x (Slowest)</span>
          <span>2x (Fastest)</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Slower speeds help you understand each step better
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 font-medium">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{steps.length > 0 ? Math.round(((currentStep + 1) / steps.length) * 100) : 0}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${steps.length > 0 ? ((currentStep + 1) / steps.length) * 100 : 0}%` }}
          />
        </div>
        {currentStep === steps.length - 1 && steps.length > 0 && (
          <div className="text-center text-sm font-medium text-green-600 dark:text-green-400 mt-2">
            ✅ Sorting Complete!
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;