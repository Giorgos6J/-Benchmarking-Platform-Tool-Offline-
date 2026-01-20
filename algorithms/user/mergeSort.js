function merge(left, right) {
  const out = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]);
    else out.push(right[j++]);
  }
  while (i < left.length) out.push(left[i++]);
  while (j < right.length) out.push(right[j++]);
  return out;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = (arr.length / 2) | 0;
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

module.exports = function mergeSortWrapper(input) {
  return mergeSort(input.slice());
};
