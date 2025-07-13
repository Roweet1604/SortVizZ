export const mergeSort = (arr) => {
  const steps = [];
  const array = [...arr];

  steps.push({
    array: [...array],
    type: 'compare',
    description: 'Starting Merge Sort - divide and conquer approach'
  });

  const mergeSortHelper = (arr, left, right) => {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...array],
      comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      type: 'compare',
      description: `Dividing array from index ${left} to ${right} at position ${mid}`
    });

    mergeSortHelper(arr, left, mid);
    mergeSortHelper(arr, mid + 1, right);
    merge(arr, left, mid, right);
  };

  const merge = (arr, left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;

    steps.push({
      array: [...array],
      comparing: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      type: 'compare',
      description: `Merging subarrays: [${leftArr.join(', ')}] and [${rightArr.join(', ')}]`
    });

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i];
        i++;
      } else {
        array[k] = rightArr[j];
        j++;
      }

      steps.push({
        array: [...array],
        swapping: [k],
        type: 'swap',
        description: `Placed ${array[k]} at position ${k} during merge`
      });

      k++;
    }

    while (i < leftArr.length) {
      array[k] = leftArr[i];
      steps.push({
        array: [...array],
        swapping: [k],
        type: 'swap',
        description: `Placed remaining element ${array[k]} at position ${k}`
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      array[k] = rightArr[j];
      steps.push({
        array: [...array],
        swapping: [k],
        type: 'swap',
        description: `Placed remaining element ${array[k]} at position ${k}`
      });
      j++;
      k++;
    }

    steps.push({
      array: [...array],
      sorted: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      type: 'sorted',
      description: `Merged and sorted subarray from index ${left} to ${right}`
    });
  };

  mergeSortHelper(array, 0, array.length - 1);

  steps.push({
    array: [...array],
    sorted: Array.from({ length: array.length }, (_, i) => i),
    type: 'sorted',
    description: 'Merge Sort completed! All elements are sorted.'
  });

  return steps;
};