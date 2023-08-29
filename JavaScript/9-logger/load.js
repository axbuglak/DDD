'use strict';

const fs = require('node:fs').promises;
const vm = require('node:vm');


const load = (runOptions) => async (filePath, sandbox) => {
  const src = await fs.readFile(filePath, 'utf8');
  const code = `'use strict';\n${src}`;
  const script = new vm.Script(code);
  const context = vm.createContext(Object.freeze({ ...sandbox }));
  const exported = script.runInContext(context, runOptions);
  return exported;
};

module.exports = (config) => load(config);
