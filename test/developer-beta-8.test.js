const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { normalizeCodexAccount } = require('../src/shared/codex-account');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('Developer Beta 8 branding and release version stay aligned', () => {
  const packageJson = JSON.parse(read('package.json'));
  assert.equal(packageJson.version, '1.0.0-beta.8');
  assert.equal(packageJson.releaseName, 'Codex CLI Launcher Developer Beta 8');
  assert.match(packageJson.build.artifactName, /^Codex-CLI-Launcher-Beta-/);
});

test('terminal resizing and the expanded account profile are wired', () => {
  const html = read('src/renderer/index.html');
  const renderer = read('src/renderer/app.js');
  const main = read('src/main.js');

  assert.match(html, /id="accountProfile"/);
  assert.match(html, /id="accountEmail"/);
  assert.match(html, /id="accountPlan"/);
  assert.match(main, /account\/read/);
  assert.match(main, /account\/rateLimits\/read/);
  assert.match(renderer, /new ResizeObserver\(scheduleFit\)/);
  assert.match(renderer, /accountProfile\.scrollIntoView/);
  assert.match(renderer, /Что изменилось в Developer Beta 8/);
  assert.match(renderer, /What changed in Developer Beta 8/);
  assert.match(main, /tray-icon\.png/);
});

test('release workflow only builds artifacts so the maintainer remains the release author', () => {
  const workflow = read('.github/workflows/release.yml');
  assert.match(workflow, /name: macos-release/);
  assert.match(workflow, /name: windows-release/);
  assert.doesNotMatch(workflow, /gh release create|publish-release:/);
});

test('Codex account data exposes safe profile fields and remaining limits', () => {
  const profile = normalizeCodexAccount(
    { account: { type: 'chatgpt', name: 'Codex User', email: 'dev@example.com', planType: 'plus' } },
    {
      rateLimits: { limitId: 'codex', primary: { usedPercent: 28, windowDurationMins: 300, resetsAt: 1234 } },
      rateLimitResetCredits: { availableCount: 2 }
    },
    'vds'
  );

  assert.deepEqual(profile, {
    ok: true,
    mode: 'vds',
    signedIn: true,
    type: 'chatgpt',
    username: 'Codex User',
    email: 'dev@example.com',
    planType: 'plus',
    resetCredits: 2,
    limits: [{ name: 'codex', remainingPercent: 72, resetsAt: 1234, windowDurationMins: 300 }]
  });
});

test('Codex username falls back to the email handle when the protocol has no name field', () => {
  const profile = normalizeCodexAccount({ account: { type: 'chatgpt', email: 'dev.user@example.com' } });
  assert.equal(profile.username, 'dev.user');
});
