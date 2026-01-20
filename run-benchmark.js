const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

/* ================= CONFIG ================= */

const config = JSON.parse(fs.readFileSync("benchmark-config.json", "utf8"));

const ALGO_MAP = {
  "array-sort-built-in": "built-in/arraySort.js",
  "insertion-sort": "user/insertionSort.js",
  "merge-sort": "user/mergeSort.js",
  "quick-sort-recursive": "user/quickSortRecursive.js",
  "quick-sort-iterative": "user/quickSortIterative.js",
};

/* ================= MEMORY HELPERS ================= */

function maybeGC() {
  if (global.gc) global.gc();
}

function heapKB() {
  return process.memoryUsage().heapUsed / 1024;
}

/* ================= DATA GENERATION ================= */

function gen(type, size) {
  const a = Array.from({ length: size }, (_, i) => i);

  if (type === "sorted") return a;

  if (type === "reversed") return a.slice().reverse();

  if (type === "random") {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  }

  if (type === "uniform") return Array(size).fill(7);

  if (type === "duplicates") {
    const b = a.slice();
    for (let i = 0; i < b.length; i++) b[i] = b[i] % 10;
    return b;
  }

  if (type === "fewUnique") {
    const b = a.slice();
    for (let i = 0; i < b.length; i++) b[i] = b[i] % 5;
    return b;
  }

  if (type === "nearlySorted") {
    const b = a.slice();
    const swaps = Math.max(1, Math.floor(size * 0.01));
    for (let k = 0; k < swaps; k++) {
      const i = (Math.random() * size) | 0;
      const j = (Math.random() * size) | 0;
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  }

  return a;
}

/* ================= LOAD ALGORITHM ================= */

function loadAlgoById(id) {
  const rel = ALGO_MAP[id];
  if (!rel) throw new Error("Unknown algorithm id: " + id);
  return require(path.join(__dirname, "algorithms", rel));
}

/* ================= BENCHMARK LOOP ================= */

const sizes = config.sizes;
const inputTypes = config.inputTypes;
const runs = Number(config.runs || 3);
const warmup = Number(config.warmup || 0);
const algoIds = config.algorithms;

const results = [];
let caseNo = 0;
const totalCases = sizes.length * inputTypes.length * algoIds.length;

for (const size of sizes) {
  for (const inputType of inputTypes) {
    for (const algoId of algoIds) {

      // ❌ ΜΗΝ κολλάει (Insertion Sort = O(n²))
      if (algoId === "insertion-sort" && size > 100000) {
        caseNo++;
        console.log(`[SKIP ${caseNo}/${totalCases}] ${algoId} size=${size} type=${inputType}`);
        continue;
      }

      caseNo++;
      console.log(`[RUN  ${caseNo}/${totalCases}] ${algoId} size=${size} type=${inputType}`);

      const fn = loadAlgoById(algoId);

      /* -------- Warmup -------- */
      for (let w = 0; w < warmup; w++) {
        fn(gen(inputType, size));
      }

      let timeTotal = 0;
      let memTotal = 0;

      for (let i = 0; i < runs; i++) {
        maybeGC();
        const memBefore = heapKB();

        const input = gen(inputType, size);
        const t0 = performance.now();
        fn(input);
        timeTotal += performance.now() - t0;

        maybeGC();
        const memAfter = heapKB();
        memTotal += memAfter - memBefore;
      }

      const timeMean = timeTotal / runs;
      const memMean = memTotal / runs;

      results.push({
        algorithm: algoId,
        displayName: algoId,
        size,
        type: inputType,
        runs,
        time_ms_mean: Number(timeMean.toFixed(4)),
        ops_sec: Number((1000 / timeMean).toFixed(2)),
        memory_kb: Number(memMean.toFixed(2)),
      });
    }
  }
}

/* ================= SAVE ================= */

fs.writeFileSync(
  "benchmark-results.json",
  JSON.stringify(results, null, 2),
  "utf8"
);

console.log("✅ DONE — benchmark-results.json generated");
console.log("Rows:", results.length);
