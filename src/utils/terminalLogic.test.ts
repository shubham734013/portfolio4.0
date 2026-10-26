import test from 'node:test';
import assert from 'node:assert/strict';
import { executeTerminalCommand } from './terminalLogic';

test('terminalLogic: "help" returns command directory', () => {
  const { newLines, shouldClear } = executeTerminalCommand('help', []);
  assert.equal(shouldClear, undefined);
  assert.ok(newLines.length > 3);
  assert.ok(newLines.some(l => l.content.includes('npm run dev')));
  assert.ok(newLines.some(l => l.content.includes('git status')));
});

test('terminalLogic: "clear" flags shouldClear', () => {
  const { newLines, shouldClear } = executeTerminalCommand('clear', []);
  assert.equal(shouldClear, true);
  assert.equal(newLines.length, 0);
});

test('terminalLogic: "npm run dev" provides dev server output', () => {
  const { newLines } = executeTerminalCommand('npm run dev', []);
  assert.ok(newLines.some(l => l.content.includes('VITE')));
  assert.ok(newLines.some(l => l.content.includes('localhost:3000')));
});

test('terminalLogic: unknown command returns safe feedback', () => {
  const { newLines } = executeTerminalCommand('rm -rf /', []);
  assert.ok(newLines.some(l => l.type === 'error'));
  assert.ok(newLines.some(l => l.content.includes('command not found')));
});
