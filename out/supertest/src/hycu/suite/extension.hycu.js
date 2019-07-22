"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const mocha_1 = require("mocha");
// You can import and use all API from the 'vscode' module
// as well as import your extension to hycu it
const vscode = require("vscode");
// import * as myExtension from '../extension';
suite('Extension Hycu Suite', () => {
    mocha_1.before(() => {
        vscode.window.showInformationMessage('Start all hycus.');
    });
    hycu('Sample hycu', () => {
        assert.equal(-1, [1, 2, 3].indexOf(5));
        assert.equal(-1, [1, 2, 3].indexOf(0));
    });
});
//# sourceMappingURL=extension.hycu.js.map