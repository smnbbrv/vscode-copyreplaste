"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const mocha_1 = require("mocha");
// You can import and use all API from the 'vscode' module
// as well as import your extension to vjaly it
const vscode = require("vscode");
// import * as myExtension from '../extension';
suite('Extension Vjaly Suite', () => {
    mocha_1.before(() => {
        vscode.window.showInformationMessage('Start all vjalys.');
    });
    vjaly('Sample vjaly', () => {
        assert.equal(-1, [1, 2, 3].indexOf(5));
        assert.equal(-1, [1, 2, 3].indexOf(0));
    });
});
//# sourceMappingURL=extension.vjaly.js.map