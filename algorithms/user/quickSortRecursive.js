function qs(a, lo, hi) {
  if (lo >= hi) return;

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

  if (lo < j) qs(a, lo, j);
  if (i < hi) qs(a, i, hi);
}

module.exports = function quickSortRecursive(input) {
  const arr = input.slice();
  qs(arr, 0, arr.length - 1);
  return arr;
};
