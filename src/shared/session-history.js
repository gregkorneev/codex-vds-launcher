const { stripVTControlCharacters } = require('node:util');

function sessionHistoryFileName(projectName) {
  const safeName = String(projectName || 'codex-session')
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1f]+/g, '-')
    .replace(/[. ]+$/g, '')
    .slice(0, 80);
  return `${safeName || 'codex-session'}-history.md`;
}

function buildSessionHistoryMarkdown({ project, transcript, language = 'ru', exportedAt = new Date().toISOString() }) {
  const english = language === 'en';
  const plainText = stripVTControlCharacters(String(transcript || ''))
    .replace(/\r\n?/g, '\n')
    .replace(/\x08/g, '')
    .trim();
  const terminalBlock = (plainText || (english ? 'Session history is empty.' : 'История сессии пуста.'))
    .split('\n')
    .map((line) => `    ${line}`)
    .join('\n');

  return [
    `# ${english ? 'Codex CLI session history' : 'История сессии Codex CLI'}`,
    '',
    `- ${english ? 'Project' : 'Проект'}: ${project.name}`,
    `- ${english ? 'Path' : 'Путь'}: ${project.path}`,
    `- ${english ? 'Exported' : 'Выгружено'}: ${exportedAt}`,
    '',
    `## ${english ? 'Latest run' : 'Последний запуск'}`,
    '',
    terminalBlock,
    ''
  ].join('\n');
}

module.exports = { buildSessionHistoryMarkdown, sessionHistoryFileName };
