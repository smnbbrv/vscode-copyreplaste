"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process");
const run_in_terminal_1 = require("run-in-terminal");
const vscode = require("vscode");
let outputChannel;
outputChannel = vscode.window.createOutputChannel('copyreplaste');
function copyreplaste(args, useTerminal) {
    let cwd = vscode.workspace.rootPath;
    if (useTerminal) {
        runCommandInTerminal(args, cwd);
    }
    else {
        runCommandInOutputWindow(args, cwd);
    }
}
exports.copyreplaste = copyreplaste;
function showOutput() {
    outputChannel.show(vscode.ViewColumn.Three);
}
function runCommandInTerminal(args, cwd) {
    run_in_terminal_1.runInTerminal('copyreplaste', args, { cwd: cwd, env: process.env });
}
function runCommandInOutputWindow(args, cwd) {
    let cmd = 'copyreplaste ' + args.join(' ');
    let p = cp.exec(cmd, { cwd: cwd, env: process.env });
    p.stderr.on('data', (data) => {
        outputChannel.append(data);
    });
    p.stdout.on('data', (data) => {
        outputChannel.append(data);
    });
    showOutput();
}
//# sourceMappingURL=run.js.map