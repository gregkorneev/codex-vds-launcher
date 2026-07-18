const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { normalizeCodexAccount } = require('../src/shared/codex-account');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('Developer Beta 7 branding and release version stay aligned', () => {
  const packageJson = JSON.parse(read('package.json'));
  assert.equal(packageJson.version, '1.0.0-beta.7');
  assert.equal(packageJson.releaseName, 'Codex CLI Launcher Developer Beta 7');
  assert.match(packageJson.build.artifactName, /^Codex-CLI-Launcher-Beta-/);
});

test('projects, quick actions, mode menus, and account profile are wired', () => {
  const html = read('src/renderer/index.html');
  const renderer = read('src/renderer/app.js');
  const main = read('src/main.js');

  assert.match(main, /ipcMain\.handle\('projects:delete'/);
  assert.match(renderer, /api\.deleteProject\(project\.id\)/);
  assert.match(renderer, /project\.custom/);
  assert.match(html, /id="quickActionsList"/);
  assert.doesNotMatch(html, /id="quickPrompts"|id="quickCommandSets"/);
  assert.match(main, /label: 'Режим работы', submenu: launcherModeMenuItems\(\)/);
  assert.match(html, /id="accountProfile"/);
  assert.match(main, /account\/read/);
  assert.match(main, /account\/rateLimits\/read/);
  assert.match(renderer, /Что изменилось в Developer Beta 7/);
  assert.match(renderer, /What changed in Developer Beta 7/);
});

test('Codex account data exposes safe profile fields and remaining limits', () => {
  const profile = normalizeCodexAccount(
    { account: { type: 'chatgpt', email: 'dev@example.com', planType: 'plus' } },
    { rateLimits: { limitId: 'codex', primary: { usedPercent: 28, windowDurationMins: 300, resetsAt: 1234 } } },
    'vds'
  );

  assert.deepEqual(profile, {
    ok: true,
    mode: 'vds',
    signedIn: true,
    type: 'chatgpt',
    email: 'dev@example.com',
    planType: 'plus',
    limits: [{ name: 'codex', remainingPercent: 72, resetsAt: 1234, windowDurationMins: 300 }]
  });
});
