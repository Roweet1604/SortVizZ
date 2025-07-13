export const selectionSort = (arr) => {
  const steps = [];
  const array = [...arr];
  const n = array.length;

  steps.push({
    array: [...array],
    type: 'compare',
    description: 'Starting Selection Sort - finding minimum elements'
  });

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    // Find minimum element in remaining array
    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...array],
        comparing: [minIndex, j],
        type: 'compare',
        description: `Comparing current minimum ${array[minIndex]} with ${array[j]}`
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
        steps.push({
          array: [...array],
          comparing: [minIndex],
          type: 'compare',
          description: `New minimum found: ${array[minIndex]} at position ${minIndex}`
        });
      }
    }

    // Swap if needed
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      steps.push({
        array: [...array],
        swapping: [i, minIndex],
        type: 'swap',
        description: `Swapped minimum element ${array[i]} to position ${i}`
      });
    }

    // Mark as sorted
    steps.push({
      array: [...array],
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      type: 'sorted',
      description: `Element at position ${i} is now in its final sorted position`
    });
  }

  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, (_, i) => i),
    type: 'sorted',
    description: 'Selection Sort completed! All elements are sorted.'
  });

  return steps;
};