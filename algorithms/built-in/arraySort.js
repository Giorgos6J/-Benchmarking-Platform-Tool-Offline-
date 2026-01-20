// algorithms/built-in/arraySort.js
// Wrapper για το native Array.sort() (V8 / Node.js)
// IMPORTANT: Κάνει clone το input για να μην αλλοιώνει το αρχικό array.

module.exports = function arraySortBuiltIn(input) {
  const arr = input.slice();

  // Numeric ascending sort (όχι lexicographic)
  arr.sort((a, b) => a - b);

  return arr;
};
