# Benchmarking Platform Tool (Offline)

<img width="1920" height="1040" alt="Benchmarking Platform Tool και 1 ακόμη σελίδα - Προσωπικό - Microsoft​ Edge 20_1_2026 11_10_41 μμ" src="https://github.com/user-attachments/assets/f937abad-f698-4be2-a865-01146815661e" />

An offline benchmarking platform for comparing JavaScript algorithm implementations.
The tool allows users to configure benchmark experiments, execute them via Node.js,
and explore results through a static HTML report with filtering, comparison, and export features.

The platform is designed for **research and experimental evaluation**, prioritizing
reproducibility, flexibility, and controlled execution over simplicity.

---

## Features

- Configuration-driven benchmarking using JSON
- Execution via Node.js (no server required)
- Support for multiple algorithms and input distributions
- Warmup iterations and multiple runs per test case
- Measurement of execution time and heap memory usage
- Offline HTML report with:
  - filtering by algorithm, input size, type, and source
  - A vs B algorithm comparison
  - export of filtered results to CSV and JSON

---

## Project Structure

.
├─ algorithms/
│ ├─ built-in/
│ │ └─ arraySort.js
│ └─ user/
│ ├─ insertionSort.js
│ ├─ mergeSort.js
│ ├─ quickSortRecursive.js
│ └─ quickSortIterative.js
├─ benchmark-config.json
├─ run-benchmark.js
├─ generate-data.js
├─ benchmark-results.json
├─ data.js
├─ index.html
├─ Runbatfile.bat
└─ Test.bat


---

## Requirements

- Node.js (v18+ recommended)
- Windows (for `.bat` execution scripts)

To enable memory measurements, Node.js must be executed with garbage collection exposed.

---

## Running the Benchmark

### Option 1: Using the provided `.bat` file (recommended)

Double-click:



This will:
1. Run the benchmark with garbage collection enabled
2. Generate the report data
3. Open the offline HTML report

---

### Option 2: Manual execution (Command Prompt)

```bat
node --expose-gc run-benchmark.js
node generate-data.js
start index.html

Benchmark Configuration

Benchmark parameters are defined in benchmark-config.json.

Example:

{
  "tag": "exp-1",
  "sizes": [1000, 10000, 100000, 1000000],
  "inputTypes": ["random", "sorted", "reversed", "nearlySorted", "duplicates", "fewUnique", "uniform"],
  "runs": 7,
  "warmup": 3,
  "algorithms": [
    "array-sort-built-in",
    "insertion-sort",
    "merge-sort",
    "quick-sort-recursive",
    "quick-sort-iterative"
  ]
}


This configuration ensures controlled and repeatable benchmark execution.

Results and Report

Benchmark results are written to:

benchmark-results.json — raw experimental output

data.js — processed report data for the HTML UI

Open index.html to explore results offline.

Exporting Results

From the HTML report, users can export the currently filtered results as:

CSV (for spreadsheets and plotting)

JSON (structured data)

Exports reflect the active filters (algorithm, size, input type, source).

Notes on Memory Measurements

Memory usage is measured as the average heap delta (KB) across runs.
Due to JavaScript garbage collection behavior, small fluctuations and negative values
may occur. These values should be interpreted comparatively rather than absolutely.

Intended Audience

This tool is intended for:

algorithm performance analysis

academic coursework and dissertations

experimental evaluation and benchmarking research

The interface assumes familiarity with benchmarking concepts and JavaScript execution environments.

License

This project is provided for educational and research purposes.


---
