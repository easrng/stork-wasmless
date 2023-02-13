let module;

/**
 * @param {string} name
 * @param {Uint8Array} data
 * @returns {string}
 */
function wasm_register_index(name, data) {
  return module.wasm_register_index(name, data);
}

/**
 * @param {string} name
 * @param {string} query
 * @returns {string}
 */
function wasm_search(name, query) {
  return module.wasm_search(name, query);
}

/**
 * @returns {string}
 */
function wasm_stork_version() {
  return module.wasm_stork_version();
}

const wasmSupported = typeof WebAssembly === "object";
const SUFFIX = ".js";
async function init(input) {
  if (typeof input === "undefined") {
    input = new URL("stork_wasm.wasm", import.meta.url);
  }
  module = await import(`./${wasmSupported ? "stork_wasm" : "stork_js"}${SUFFIX}`);
  if (wasmSupported) await module.default();
  init.__wbindgen_wasm_module = module;
  return module;
}

export { init as default, wasm_register_index, wasm_search, wasm_stork_version };
