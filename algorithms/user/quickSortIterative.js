function partition(a, lo, hi) {
  const pivot = a[(lo + hi) >> 1];
  let i = lo, j = hi;
  while (i <= j) {
    while (a[i] < pivot) i++;
    while (a[j] > pivot) j--;
    if (i <= j) {
      const t = a[i]; a[i] = a[j]; a[j] = t;
      i++; j--;
    }
  }
  return i;
}

module.exports = function quickSortIterative(input) {
  const arr = input.slice();
  const stack = [[0, arr.length - 1]];

  while (stack.length) {
    const [lo, hi] = stack.pop();
    if (lo >= hi) continue;

    const idx = partition(arr, lo, hi);

    // push larger first (small optimization)
    const left = [lo, idx - 1];
    const right = [idx, hi];
    const leftSize = left[1] - left[0];
    const rightSize = right[1] - right[0];

    if (leftSize > rightSize) {
      stack.push(left);
      stack.push(right);
    } else {
      stack.push(right);
      stack.push(left);
    }
  }

  return arr;
};
