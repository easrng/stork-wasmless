#!/bin/bash
if [ ! -d stork ]; then
  git clone 'https://github.com/jameslittle230/stork'
fi
cd stork
cd stork-wasm
wasm-pack build --target bundler --out-name stork_js -- --no-default-features --features="v3"
wasm-pack build --target web --out-name stork_wasm -- --no-default-features --features="v3"
cd ..
wasm2js stork-wasm/pkg/stork_js_bg.wasm -o stork-wasm/pkg/stork_js_bg.wasm.js -O4
sed -i 's/stork_js_bg.wasm/stork_js_bg.wasm.js/' stork-wasm/pkg/stork_js_bg.js
sed -i 's/stork_js_bg.wasm/stork_js_bg.wasm.js/' stork-wasm/pkg/stork_js.js
cd ..
mkdir -p dist
./node_modules/.bin/rollup -c rollup.config.stork.js --environment target:js
./node_modules/.bin/rollup -c rollup.config.stork.js --environment target:wasm
./node_modules/.bin/rollup -c rollup.config.wrapper.js
cp stork/stork-wasm/pkg/stork_wasm_bg.wasm dist/
