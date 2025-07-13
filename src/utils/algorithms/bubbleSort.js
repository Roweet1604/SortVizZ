export const bubbleSort = (arr) => {
  const steps = [];
  const array = [...arr];
  const n = array.length;

  // Initial state
  steps.push({
    array: [...array],
    type: 'compare',
    description: 'Starting Bubble Sort - comparing adjacent elements'
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing elements
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        type: 'compare',
        description: `Comparing elements at positions ${j} and ${j + 1}: ${array[j]} and ${array[j + 1]}`
      });

      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;

        steps.push({
          array: [...array],
          swapping: [j, j + 1],
          type: 'swap',
          description: `Swapped ${array[j + 1]} and ${array[j]} because ${array[j + 1]} < ${array[j]}`
        });
      }
    }

    // Mark the last element as sorted
    const sortedIndices = Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx);
    steps.push({
      array: [...array],
      sorted: sortedIndices,
      type: 'sorted',
      description: `Element at position ${n - 1 - i} is now in its final sorted position`
    });

    if (!swapped) {
      // Array is already sorted
      break;
    }
  }

  // Final sorted array
  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, (_, i) => i),
    type: 'sorted',
    description: 'Bubble Sort completed! All elements are now sorted.'
  });

  return steps;
};