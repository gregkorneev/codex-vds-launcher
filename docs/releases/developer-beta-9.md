## Русский

**Codex CLI Launcher Developer Beta 9** добавляет выгрузку истории последнего запуска каждой сессии в Markdown.

Главное:
- В разделе «Сессии» рядом с каждой сессией появилась отдельная кнопка `⇩` «Сгрузить историю сессии».
- Launcher предлагает нативный диалог сохранения macOS или Windows и имя файла `<сессия>-history.md`.
- В Markdown попадает именно последний запуск выбранной сессии, а не история другого проекта.
- Файл содержит название проекта, путь, время выгрузки и историю терминала в читаемом Markdown-блоке.
- Управляющие ANSI-последовательности терминала удаляются перед сохранением.
- История последнего запуска сохраняется между перезапусками Launcher и ограничена тем же безопасным размером, что и локальная история терминала.
- История из Beta 8 остаётся доступной для первой выгрузки; после следующего запуска границы последней сессии становятся точными.
- Release workflow теперь собирает как prerelease Beta, так и стабильные semver-теги для macOS и Windows.

## English

**Codex CLI Launcher Developer Beta 9** adds Markdown export for the latest run of every session.

Highlights:
- Each item in the Sessions section now has a dedicated `⇩` “Export session history” button.
- Launcher opens the native macOS or Windows save dialog with a `<session>-history.md` file name.
- The export contains the latest run of the selected session, never another project's history.
- The Markdown file includes the project name, path, export time, and terminal history in a readable Markdown block.
- Terminal ANSI control sequences are removed before the file is saved.
- Latest-run history persists across Launcher restarts and uses the same safe size limit as local terminal history.
- Beta 8 history remains available for the first export; after the next launch, the latest-session boundaries are exact.
- The release workflow now builds both Beta prerelease and stable semver tags for macOS and Windows.

This is a prerelease. The macOS app is ad-hoc signed and is not notarized.
