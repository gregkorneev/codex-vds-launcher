function normalizeWindow(value, name) {
  if (!value || typeof value !== 'object') return null;
  const usedPercent = Math.max(0, Math.min(100, Number(value.usedPercent) || 0));
  return {
    name,
    remainingPercent: 100 - usedPercent,
    resetsAt: Number.isInteger(value.resetsAt) ? value.resetsAt : null,
    windowDurationMins: Number.isInteger(value.windowDurationMins) ? value.windowDurationMins : null
  };
}

function normalizeCodexAccount(accountResponse = {}, rateLimitResponse = {}, mode = 'local') {
  const account = accountResponse.account || null;
  const snapshots = rateLimitResponse.rateLimitsByLimitId;
  const rateLimits = snapshots?.codex || rateLimitResponse.rateLimits || null;
  const name = rateLimits?.limitName || rateLimits?.limitId || 'Codex';
  const email = typeof account?.email === 'string' ? account.email : null;
  const username = account?.name || account?.displayName || account?.username || email?.split('@')[0] || null;

  return {
    ok: true,
    mode: mode === 'vds' ? 'vds' : 'local',
    signedIn: Boolean(account),
    type: account?.type || null,
    username,
    email,
    planType: account?.planType || rateLimits?.planType || null,
    resetCredits: Number.isInteger(rateLimitResponse.rateLimitResetCredits?.availableCount)
      ? rateLimitResponse.rateLimitResetCredits.availableCount
      : null,
    limits: [
      normalizeWindow(rateLimits?.primary, name),
      normalizeWindow(rateLimits?.secondary, name)
    ].filter(Boolean)
  };
}

module.exports = { normalizeCodexAccount };
