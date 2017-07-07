const d3node = require('d3-node');
const output = require('d3node-output');
const markvisPie = require('../');

const gen = n => {
  const data = [];

  for (let i = 0; i < n; ++i) {
    data.push({
      key: i,
      value: Math.max(10, Math.floor(Math.random() * 100))
    });
  }

  return data;
};

// create output files
output('./example/output', markvisPie({ data: gen(5), d3node, export: true }));
