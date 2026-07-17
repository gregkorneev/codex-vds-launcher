const { profileProjectPath, readProjects, writeProjects } = require('../shared/user-projects');

class WebProfileProjectStore {
  constructor(baseDirectory, options = {}) {
    this.baseDirectory = baseDirectory;
    this.options = options;
  }

  load(profileId) {
    return readProjects(profileProjectPath(this.baseDirectory, profileId), this.options);
  }

  save(profileId, projects) {
    return writeProjects(profileProjectPath(this.baseDirectory, profileId), projects, this.options);
  }
}

module.exports = { WebProfileProjectStore };
