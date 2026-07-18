## Русский

**Codex CLI Launcher Developer Beta 8** исправляет масштабирование встроенного терминала, расширяет профиль Codex и обновляет иконки приложения.

Главное:
- Исправлено наложение встроенного терминала на правую панель при изменении размера окна или видимости боковых панелей. Терминал теперь отслеживает фактический размер своего контейнера.
- Раскрываемый профиль Codex внизу левой панели отдельно показывает имя пользователя, email, тип подписки, оставшийся процент лимитов и время их обновления.
- Если Codex app-server не предоставляет отдельное имя, Launcher безопасно использует часть email до символа `@` как имя пользователя.
- При наличии данных отображается количество доступных дополнительных сбросов лимита.
- Профиль работает с локальным Codex CLI и Codex CLI на выбранной VDS, не читая и не показывая токены.
- Обновлены иконки приложения для macOS, Windows и интерфейса Launcher. Иконки menu bar и tray не изменены.

## English

**Codex CLI Launcher Developer Beta 8** fixes embedded terminal scaling, expands the Codex profile, and refreshes application icons.

Highlights:
- Fixed the embedded terminal overlapping the right panel after window or side-panel size changes. The terminal now observes the actual size of its container.
- The expandable Codex profile at the bottom of the left panel separately shows the username, email, subscription type, remaining limit percentage, and reset times.
- When Codex app-server does not provide a separate name, Launcher safely uses the part of the email address before `@` as the username.
- The number of available extra limit resets is shown when supplied by Codex.
- The profile works with both the local Codex CLI and the selected VDS Codex CLI without reading or exposing tokens.
- Application icons have been refreshed for macOS, Windows, and the Launcher UI. Menu bar and tray icons are unchanged.

This is a prerelease. The macOS app is ad-hoc signed and is not notarized.
