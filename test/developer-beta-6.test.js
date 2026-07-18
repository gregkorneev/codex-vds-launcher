const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('Developer Beta 6 branding and release version stay aligned', () => {
  const packageJson = JSON.parse(read('package.json'));

  assert.equal(packageJson.name, 'codex-cli-launcher');
  assert.equal(packageJson.version, '1.0.0-beta.6');
  assert.equal(packageJson.releaseName, 'Codex CLI Launcher Developer Beta 6');
  assert.match(packageJson.build.artifactName, /^Codex-CLI-Launcher-Beta-/);
});

test('mode-specific and collapsible sections remain wired into the UI', () => {
  const html = read('src/renderer/index.html');
  const app = read('src/renderer/app.js');

  for (const section of ['projects', 'updates', 'localMd', 'quickActions']) {
    assert.match(html, new RegExp(`<details[^>]+data-section="${section}"`));
  }

  assert.match(html, /id="launcherMode"/);
  assert.match(html, /data-section="status" data-vds-only/);
  assert.match(app, /project\.location === location/);
  assert.match(app, /RELEASE_CHANGES/);
  assert.match(app, /Что изменилось в Developer Beta 6/);
  assert.match(app, /What changed in Developer Beta 6/);
});
