export const quickSort = (arr) => {
  const steps = [];
  const array = [...arr];

  steps.push({
    array: [...array],
    type: 'compare',
    description: 'Starting Quick Sort - using last element as pivot'
  });

  const quickSortHelper = (arr, low, high) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high);
      quickSortHelper(arr, low, pivotIndex - 1);
      quickSortHelper(arr, pivotIndex + 1, high);
    }
  };

  const partition = (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...array],
      pivot: high,
      type: 'pivot',
      description: `Choosing ${pivot} at index ${high} as pivot`
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...array],
        comparing: [j, high],
        pivot: high,
        type: 'compare',
        description: `Comparing ${arr[j]} with pivot ${pivot}`
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({
            array: [...array],
            swapping: [i, j],
            pivot: high,
            type: 'swap',
            description: `Swapped ${arr[i]} and ${arr[j]} - moving smaller element to left`
          });
        }
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      array: [...array],
      swapping: [i + 1, high],
      type: 'swap',
      description: `Placed pivot ${pivot} at its final position ${i + 1}`
    });

    steps.push({
      array: [...array],
      sorted: [i + 1],
      type: 'sorted',
      description: `Pivot ${pivot} is now in its final sorted position`
    });

    return i + 1;
  };

  quickSortHelper(array, 0, array.length - 1);

  steps.push({
    array: [...array],
    sorted: Array.from({ length: array.length }, (_, i) => i),
    type: 'sorted',
    description: 'Quick Sort completed! All elements are sorted.'
  });

  return steps;
};