# Security / Безопасность

Русский раздел находится ниже: [Русский](#русский).

## English

Codex CLI Launcher is a local desktop wrapper around OpenSSH and Codex CLI. It is not a credential manager and does not provision server access.

### Secrets

The app does not store:

- passwords;
- private SSH keys;
- OpenAI/API tokens;
- `.env` files;
- server credentials.

SSH keys and aliases are managed by the user through normal OpenSSH configuration, ssh-agent, keychain, or platform tools.

### SSH Behavior

The app checks for an OpenSSH client and checks whether the configured alias exists in `~/.ssh/config`.

It does not:

- ask for SSH passwords;
- store SSH passwords;
- create SSH keys;
- upload keys to a server;
- silently create a new `Host` block.

Session launch uses:

```bash
ssh -tt -o BatchMode=yes -o ConnectTimeout=15 <sshAlias> "cd <projectPath> && <codexCommand>"
```

`BatchMode=yes` is kept so password prompts fail instead of appearing inside the embedded terminal.

### Validation

SSH commands are built from validated values:

- `sshAlias` must be a simple alias using letters, digits, dot, underscore, or dash.
- `project.path` must be an absolute Unix path and is shell-quoted before use.
- `codexCommand` is whitelisted to `codex` or `codex-vpn`.

Arbitrary configured launch commands are not accepted.

### AGENTS.md

When enabled, the app syncs a managed `AGENTS.md` into the selected local or remote project before starting Codex.

The managed marker is:

```html
<!-- Managed by Codex CLI Launcher -->
```

If a project already has an `AGENTS.md` without that marker, the app leaves it unchanged and prints a warning in the terminal.

### Local History

Terminal history is stored locally in Electron user data as `codex-history.json`. It can contain sensitive output from remote commands or Codex sessions. Clear history from the app when needed.

### Server Status

Status cards are read-only and inspect VDS connectivity, identity, and command availability. The renderer cannot submit update URLs: the main process constructs and validates the exact official GitHub release URL before opening it.

### User Responsibility

The user is responsible for SSH config correctness, private key storage and permissions, remote user permissions, server hardening, and choosing whether `codex` or `codex-vpn` is appropriate for the environment.

## Русский

Codex CLI Launcher — локальная desktop-оболочка вокруг OpenSSH и Codex CLI. Это не менеджер секретов и не инструмент автоматической настройки серверного доступа.

### Секреты

Приложение не хранит:

- пароли;
- приватные SSH-ключи;
- OpenAI/API токены;
- `.env` файлы;
- серверные учётные данные.

SSH-ключами и alias управляет пользователь через обычный OpenSSH config, ssh-agent, keychain или системные инструменты.

### Поведение SSH

Приложение проверяет наличие OpenSSH client и наличие выбранного alias в `~/.ssh/config`.

Оно не:

- спрашивает SSH-пароли;
- хранит SSH-пароли;
- создаёт SSH-ключи;
- отправляет ключи на сервер;
- молча создаёт новый `Host` block.

Запуск сессии использует:

```bash
ssh -tt -o BatchMode=yes -o ConnectTimeout=15 <sshAlias> "cd <projectPath> && <codexCommand>"
```

`BatchMode=yes` сохраняется, чтобы парольные prompts завершались ошибкой, а не появлялись во встроенном терминале.

### Валидация

SSH-команды строятся из валидированных значений:

- `sshAlias` — простой alias из букв, цифр, точки, подчёркивания или дефиса.
- `project.path` — абсолютный Unix-путь, который shell-quoted перед использованием.
- `codexCommand` — whitelist: `codex` или `codex-vpn`.

Произвольные команды запуска из конфига не принимаются.

### AGENTS.md

Если опция включена, приложение синхронизирует управляемый `AGENTS.md` в выбранный локальный или удалённый проект перед запуском Codex.

Маркер управления:

```html
<!-- Managed by Codex CLI Launcher -->
```

Если в проекте уже есть `AGENTS.md` без этого маркера, приложение оставляет файл без изменений и печатает предупреждение в терминал.

### Локальная история

История терминала хранится локально в Electron user data как `codex-history.json`. Она может содержать чувствительный вывод удалённых команд или Codex-сессий. Очищайте историю в приложении при необходимости.

### Статус сервера

Карточки статуса выполняют только read-only проверки VDS и доступности команд. Renderer не передаёт URL обновления: main process сам строит и проверяет точную страницу официального GitHub release.

### Ответственность пользователя

Пользователь отвечает за корректность SSH config, хранение и права приватных ключей, права удалённого пользователя, hardening сервера и выбор между `codex` и `codex-vpn` для своей среды.
