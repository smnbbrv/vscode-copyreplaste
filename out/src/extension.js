"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const run_1 = require("./run");
let copiedPath;
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.copyreplasteCopy', uri => {
        const fsPath = uri.fsPath;
        if (!fsPath) {
            vscode.window.showErrorMessage('Use the file tree submenu to select files to copy');
        }
        else {
            copiedPath = fsPath;
            vscode.window.showInformationMessage('Copied');
        }
    }));
    context.subscriptions.push(vscode.commands.registerCommand('extension.copyreplastePaste', uri => {
        if (!copiedPath) {
            vscode.window.showErrorMessage('Use the file tree submenu to select files to copy before paste');
        }
        else {
            const pastePath = uri.fsPath;
            if (!pastePath) {
                vscode.window.showErrorMessage('Use the file tree submenu to select where to paste');
            }
            else {
                let replaced, replacedWith;
                vscode.window.showInputBox({ prompt: 'What is being replaced, comma-separated?', placeHolder: 'something1,something2' })
                    .then(value => {
                    replaced = value;
                    return vscode.window.showInputBox({ prompt: 'With what it should be replaced, comma-separated', placeHolder: 'something1,something2' });
                })
                    .then(value => {
                    replacedWith = value;
                    if (!replaced || !replacedWith) {
                        vscode.window.showErrorMessage('Please specify what and how should be replaced');
                    }
                    else {
                        if ((replaced.match(/,/g) || []).length !== (replacedWith.match(/,/g) || []).length) {
                            vscode.window.showErrorMessage('The amount of items being replaced is not equal to amount of replacement items');
                        }
                        else {
                            run_1.copyreplaste([
                                '--from=' + copiedPath,
                                '--to=' + pastePath,
                                '--replace=' + replaced,
                                '--with=' + replacedWith,
                            ]);
                        }
                    }
                });
            }
        }
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map