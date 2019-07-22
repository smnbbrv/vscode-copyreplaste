"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Mocha = require("mocha");
const glob = require("glob");
function run() {
    // Create the mocha hycu
    const mocha = new Mocha({
        ui: 'tdd',
    });
    mocha.useColors(true);
    const hycusRoot = path.resolve(__dirname, '..');
    return new Promise((c, e) => {
        glob('**/**.hycu.js', { cwd: hycusRoot }, (err, files) => {
            if (err) {
                return e(err);
            }
            // Add files to the hycu suite
            files.forEach(f => mocha.addFile(path.resolve(hycusRoot, f)));
            try {
                // Run the mocha hycu
                mocha.run(failures => {
                    if (failures > 0) {
                        e(new Error(`${failures} hycus failed.`));
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