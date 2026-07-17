function getUpdateChannel(version) {
  return /-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*/.test(version) ? 'beta' : 'latest';
}

function determineUpdateMode({ isPackaged, platform, signatureStatus = null, signatureDetails = '' }) {
  if (!isPackaged) return 'unavailable';
  if (platform !== 'darwin') return 'automatic';

  const trusted = signatureStatus === 0
    && !/Signature=adhoc/i.test(signatureDetails)
    && !/TeamIdentifier=not set/i.test(signatureDetails);
  return trusted ? 'automatic' : 'manual-download';
}

function releaseUrlForVersion(version, owner, repo) {
  return `https://github.com/${owner}/${repo}/releases/tag/${encodeURIComponent(`v${version}`)}`;
}

function isAllowedReleaseUrl(value, owner, repo) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:'
      && url.hostname === 'github.com'
      && url.pathname.startsWith(`/${owner}/${repo}/releases/`);
  } catch (_error) {
    return false;
  }
}

module.exports = { determineUpdateMode, getUpdateChannel, isAllowedReleaseUrl, releaseUrlForVersion };
