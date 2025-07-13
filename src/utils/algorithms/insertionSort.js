export const insertionSort = (arr) => {
  const steps = [];
  const array = [...arr];
  const n = array.length;

  steps.push({
    array: [...array],
    sorted: [0],
    type: 'sorted',
    description: 'Starting Insertion Sort - first element is considered sorted'
  });

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    steps.push({
      array: [...array],
      comparing: [i],
      type: 'compare',
      description: `Inserting element ${key} into the sorted portion`
    });

    // Move elements greater than key one position ahead
    while (j >= 0 && array[j] > key) {
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        type: 'compare',
        description: `Comparing ${array[j]} with ${key} - shifting ${array[j]} right`
      });

      array[j + 1] = array[j];
      
      steps.push({
        array: [...array],
        swapping: [j, j + 1],
        type: 'swap',
        description: `Moved ${array[j + 1]} one position to the right`
      });

      j--;
    }

    array[j + 1] = key;

    steps.push({
      array: [...array],
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      type: 'sorted',
      description: `Inserted ${key} at position ${j + 1} - first ${i + 1} elements are now sorted`
    });
  }

  steps.push({
    array: [...array],
    sorted: Array.from({ length: n }, (_, i) => i),
    type: 'sorted',
    description: 'Insertion Sort completed! All elements are sorted.'
  });

  return steps;
};