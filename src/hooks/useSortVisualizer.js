import { useCallback, useEffect, useRef } from 'react';
import { useSortContext } from '../contexts/SortContext';
import { bubbleSort } from '../utils/algorithms/bubbleSort';
import { insertionSort } from '../utils/algorithms/insertionSort';
import { mergeSort } from '../utils/algorithms/mergeSort';
import { quickSort } from '../utils/algorithms/quickSort';
import { selectionSort } from '../utils/algorithms/selectionSort';

import { TWEEN_MS } from '../components/SortCanvas'; // sync with canvas

const PAUSE_AFTER_TWEEN = 250; // extra time between animations
const FRAME_MS = TWEEN_MS + PAUSE_AFTER_TWEEN;

export const useSortVisualizer = () => {
  const {
    setSteps,
    setCurrentStep,
    currentStep,
    steps,
    isPlaying,
    setIsPlaying,
    setStats
  } = useSortContext();

  const timerRef = useRef(null);

  const algorithmMap = {
    bubble: bubbleSort,
    selection: selectionSort,
    insertion: insertionSort,
    merge: mergeSort,
    quick: quickSort,
    heap: bubbleSort, // placeholder
    counting: bubbleSort, // placeholder
    radix: bubbleSort, // placeholder
    bucket: bubbleSort, // placeholder
  };

  const initializeVisualization = useCallback((numbers, algorithm) => {
    const sortFunction = algorithmMap[algorithm];
    if (!sortFunction) return;

    const startTime = performance.now();
    const sortSteps = sortFunction([...numbers]);
    const endTime = performance.now();

    setSteps(sortSteps);
    setCurrentStep(0);
    setStats({
      comparisons: sortSteps.filter(s => s.type === 'compare').length,
      swaps: sortSteps.filter(s => s.type === 'swap').length,
      time: endTime - startTime
    });
  }, [setSteps, setCurrentStep, setStats]);

  const play = useCallback(() => {
    if (steps.length === 0) return;
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }

    setIsPlaying(true);
  }, [currentStep, steps.length, setCurrentStep, setIsPlaying, steps]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [setIsPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, FRAME_MS);

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStep, steps.length, setCurrentStep, setIsPlaying]);

  const stepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, steps.length, setCurrentStep]);

  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, setCurrentStep]);

  const reset = useCallback(() => {
    pause();
    setCurrentStep(0);
  }, [pause, setCurrentStep]);

  return {
    initializeVisualization,
    play,
    pause,
    stepForward,
    stepBackward,
    reset
  };
};
