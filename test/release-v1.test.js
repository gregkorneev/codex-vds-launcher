const assert = require('node:assert/strict');
// Stable version 1 integration checks.
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { normalizeCodexAccount } = require('../src/shared/codex-account');
const { buildSessionHistoryMarkdown, sessionHistoryFileName } = require('../src/shared/session-history');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('stable version 1 branding and release metadata stay aligned', () => {
  const packageJson = JSON.parse(read('package.json'));
  assert.equal(packageJson.version, '1.0.0');
  assert.equal(packageJson.releaseName, 'Codex CLI Launcher v1');
  assert.equal(packageJson.build.productName, 'Codex CLI Launcher');
  assert.equal(packageJson.build.publish.channel, 'latest');
  assert.equal(packageJson.build.publish.releaseType, 'release');
  assert.match(packageJson.build.artifactName, /^Codex-CLI-Launcher-\$\{version\}/);
  assert.doesNotMatch(packageJson.build.artifactName, /Beta/);
});

test('terminal resizing, account profile, and session export are wired', () => {
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
  assert.match(renderer, /Что входит в Codex CLI Launcher v1/);
  assert.match(renderer, /What's included in Codex CLI Launcher v1/);
  assert.match(renderer, /exportSessionHistory/);
  assert.match(main, /history:exportSession/);
  assert.match(main, /tray-icon\.png/);
});

test('stable release notes present one unified feature list', () => {
  const notes = read('docs/releases/v1.0.0.md');
  const readme = read('README.md');
  assert.match(notes, /В Codex CLI Launcher v1 представлены следующие функции/);
  assert.match(notes, /Выгрузка истории последнего запуска выбранной сессии в Markdown/);
  assert.match(notes, /Codex CLI Launcher v1 introduces the following features/);
  assert.match(notes, /Export the selected session's latest-run history to Markdown/);
  assert.doesNotMatch(notes, /Developer Beta \d|Путь от Beta|From Beta/);
  assert.match(readme, /first stable release is .*v1\.0\.0/);
  assert.match(readme, /Первый стабильный релиз .*v1\.0\.0/);
});

test('session export produces readable Markdown without terminal control sequences', () => {
  const markdown = buildSessionHistoryMarkdown({
    project: { name: 'Demo / Project', path: '/tmp/demo' },
    transcript: '\u001b[32mhello\u001b[0m\r\nworld',
    exportedAt: '2026-07-19T00:00:00.000Z'
  });

  assert.match(markdown, /## Последний запуск/);
  assert.match(markdown, /    hello\n    world/);
  assert.doesNotMatch(markdown, /\u001b/);
  assert.equal(sessionHistoryFileName('Demo / Project'), 'Demo - Project-history.md');
});

test('release workflow only builds artifacts so the maintainer remains the release author', () => {
  const workflow = read('.github/workflows/release.yml');
  assert.match(workflow, /name: macos-release/);
  assert.match(workflow, /name: windows-release/);
  assert.match(workflow, /'v\*\.\*\.\*'/);
  assert.match(workflow, /channel=.*beta.*latest/);
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
