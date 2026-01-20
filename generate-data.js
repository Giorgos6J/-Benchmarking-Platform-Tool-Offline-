const fs = require("fs");
const config = JSON.parse(fs.readFileSync("benchmark-config.json","utf8"));
const results = JSON.parse(fs.readFileSync("benchmark-results.json","utf8"));
if (!Array.isArray(results)) throw new Error("benchmark-results.json must be an array");
const tag = config.tag || "run";
const summaries = results.map(r => ({
  algorithm: r.algorithm,
  displayName: r.displayName || r.algorithm,
  category: "sorting",
  input_size: r.size,
  input_type: r.type,
  runs: r.runs,
  time_ms_mean: r.time_ms_mean,
  time_ms_std: null,
  ops_sec_mean: r.ops_sec,
  memory_kb_mean: r.memory_kb,
  __sourceFile: tag
}));
const data = {
  createdAt: new Date().toISOString(),
  sources: [{ file: tag, source: tag, createdAt: new Date().toISOString() }],
  summaries
};
fs.writeFileSync("data.js", "window.__REPORT_DATA__ = " + JSON.stringify(data,null,2), "utf8");
console.log("OK data.js generated. Rows:", summaries.length);
