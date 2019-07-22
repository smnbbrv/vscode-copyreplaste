"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Mocha = require("mocha");
const glob = require("glob");
function run() {
    // Create the mocha vjaly
    const mocha = new Mocha({
        ui: 'tdd',
    });
    mocha.useColors(true);
    const vjalysRoot = path.resolve(__dirname, '..');
    return new Promise((c, e) => {
        glob('**/**.vjaly.js', { cwd: vjalysRoot }, (err, files) => {
            if (err) {
                return e(err);
            }
            // Add files to the vjaly suite
            files.forEach(f => mocha.addFile(path.resolve(vjalysRoot, f)));
            try {
                // Run the mocha vjaly
                mocha.run(failures => {
                    if (failures > 0) {
                        e(new Error(`${failures} vjalys failed.`));
                    }
                    else {
                        c();
                    }
                });
            }
            catch (err) {
                e(err);
            }
        });
    });
}
exports.run = run;
//# sourceMappingURL=index.js.map