const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {
  normalizeProject,
  profileProjectPath,
  readProjects,
  writeProjects
} = require('../src/shared/user-projects');
const { WebProfileProjectStore } = require('../src/web/project-store');

test('accepts local projects and only remote projects inside the configured root', () => {
  assert.deepEqual(normalizeProject({
    id: 'custom-api', name: ' API ', path: '/opt/api', location: 'remote'
  }), {
    id: 'custom-api', name: 'API', path: '/opt/api', location: 'remote', custom: true
  });
  assert.equal(normalizeProject({
    id: 'custom-escape', name: 'Escape', path: '/opt/../etc', location: 'remote'
  }), null);
  assert.equal(normalizeProject({
    id: 'custom-relative', name: 'Local', path: 'repo', location: 'local'
  }), null);
});

test('stores desktop and Web/PWA profile projects in separate JSON files', (t) => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-vds-projects-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const desktopPath = path.join(directory, 'user-projects.json');
  const webPath = profileProjectPath(directory, 'user-1');
  const webStore = new WebProfileProjectStore(directory);
  const project = { id: 'custom-api', name: 'API', path: '/opt/api', location: 'remote' };

  writeProjects(desktopPath, [project]);
  webStore.save('user-1', [{ ...project, id: 'custom-web' }]);

  assert.equal(readProjects(desktopPath)[0].id, 'custom-api');
  assert.equal(webStore.load('user-1')[0].id, 'custom-web');
  assert.notEqual(desktopPath, webPath);
});
