import * as cp from 'child_process';
import { runInTerminal } from 'run-in-terminal';
import * as vscode from 'vscode';

let outputChannel: vscode.OutputChannel;

outputChannel = vscode.window.createOutputChannel('copyreplaste');

export function copyreplaste(args: string[], useTerminal?: boolean): void {
  let cwd = vscode.workspace.rootPath as string;

  if (useTerminal) {
    runCommandInTerminal(args, cwd);
  } else {
    runCommandInOutputWindow(args, cwd);
  }
}

function showOutput(): void {
  outputChannel.show(vscode.ViewColumn.Three);
}

function runCommandInTerminal(args: string[], cwd: string): void {
  runInTerminal('copyreplaste', args, { cwd: cwd, env: process.env });
}

function runCommandInOutputWindow(args: string[], cwd: string) {
  let cmd = 'copyreplaste ' + args.join(' ');
  let p = cp.exec(cmd, { cwd: cwd, env: process.env });
  p.stderr.on('data', (data: string) => {
    outputChannel.append(data);
  });
  p.stdout.on('data', (data: string) => {
    outputChannel.append(data);
  });
  showOutput();
}
