const fs = require('node:fs');
const path = require('node:path');

const PROJECT_ID_PATTERN = /^custom-[a-z0-9-]{1,64}$/;

function isInsideRemoteRoot(value, remoteRoot) {
  const resolvedRoot = path.posix.resolve(remoteRoot);
  const resolvedPath = path.posix.resolve(value);
  if (resolvedRoot === '/') return resolvedPath !== '/' && resolvedPath.startsWith('/');
  return resolvedPath.startsWith(`${resolvedRoot}/`);
}

function normalizeProject(value, { remoteRoot = '/opt' } = {}) {
  if (!value || typeof value !== 'object') return null;

  const id = typeof value.id === 'string' ? value.id.trim().toLowerCase() : '';
  const name = typeof value.name === 'string' ? value.name.trim().slice(0, 100) : '';
  const location = value.location === 'local' ? 'local' : 'remote';
  const rawPath = typeof value.path === 'string' ? value.path.trim() : '';

  if (!PROJECT_ID_PATTERN.test(id) || !name || !rawPath || /[\0\r\n]/.test(rawPath)) return null;

  if (location === 'remote') {
    if (!isInsideRemoteRoot(rawPath, remoteRoot)) return null;
    return { id, name, path: path.posix.resolve(rawPath), location, custom: true };
  }

  if (!path.isAbsolute(rawPath)) return null;
  return { id, name, path: path.resolve(rawPath), location, custom: true };
}

function normalizeProjects(value, options) {
  const projects = [];
  const ids = new Set();

  for (const item of Array.isArray(value) ? value.slice(0, 100) : []) {
    const project = normalizeProject(item, options);
    if (project && !ids.has(project.id)) {
      ids.add(project.id);
      projects.push(project);
    }
  }

  return projects;
}

function readProjects(filePath, options) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return normalizeProjects(raw.trim() ? JSON.parse(raw) : [], options);
  } catch (_error) {
    return [];
  }
}

function writeProjects(filePath, projects, options) {
  const normalized = normalizeProjects(projects, options);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp`;
  fs.writeFileSync(temporaryPath, `${JSON.stringify(normalized, null, 2)}\n`, 'utf8');
  fs.renameSync(temporaryPath, filePath);
  return normalized;
}

function profileProjectPath(baseDirectory, profileId) {
  const safeProfileId = typeof profileId === 'string' && /^[a-z0-9_-]{1,80}$/i.test(profileId)
    ? profileId
    : null;
  if (!safeProfileId) throw new Error('Invalid Web/PWA profile id.');
  return path.join(baseDirectory, 'profiles', safeProfileId, 'projects.json');
}

module.exports = {
  normalizeProject,
  normalizeProjects,
  profileProjectPath,
  readProjects,
  writeProjects
};
