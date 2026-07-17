const test = require('node:test');
const assert = require('node:assert/strict');
const {
  determineUpdateMode,
  getUpdateChannel,
  isAllowedReleaseUrl,
  releaseUrlForVersion
} = require('../src/shared/update-policy');

test('selects beta metadata only for prereleases', () => {
  assert.equal(getUpdateChannel('1.0.0-beta.5'), 'beta');
  assert.equal(getUpdateChannel('1.0.0'), 'latest');
});

test('avoids ShipIt for ad-hoc macOS packages', () => {
  assert.equal(determineUpdateMode({
    isPackaged: true,
    platform: 'darwin',
    signatureStatus: 0,
    signatureDetails: 'Signature=adhoc\nTeamIdentifier=not set'
  }), 'manual-download');
  assert.equal(determineUpdateMode({
    isPackaged: true,
    platform: 'darwin',
    signatureStatus: 0,
    signatureDetails: 'Authority=Developer ID Application\nTeamIdentifier=TEAMID'
  }), 'automatic');
  assert.equal(determineUpdateMode({ isPackaged: true, platform: 'win32' }), 'automatic');
});

test('accepts only official repository release URLs', () => {
  const url = releaseUrlForVersion('1.0.0-beta.5', 'gregkorneev', 'codex-vds-launcher');
  assert.equal(isAllowedReleaseUrl(url, 'gregkorneev', 'codex-vds-launcher'), true);
  assert.equal(isAllowedReleaseUrl('https://example.com/release', 'gregkorneev', 'codex-vds-launcher'), false);
  assert.equal(isAllowedReleaseUrl('https://github.com/other/repo/releases/tag/v1', 'gregkorneev', 'codex-vds-launcher'), false);
});
