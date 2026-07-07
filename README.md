# Codex VDS Launcher

Desktop launcher for running Codex CLI on your VDS over SSH.

Русский раздел находится ниже: [Русский](#русский).

## English

Codex VDS Launcher is a local Electron app with an embedded xterm.js terminal. It starts Codex CLI on a remote server through a user-managed OpenSSH alias, keeps local terminal history, supports quick prompts, imports local Markdown instructions, and can sync a managed `AGENTS.md` into the selected remote project.

### Status

Developer beta / macOS-first. The first public beta is intended for manual testing before a broader release.

### Features

- Embedded xterm.js terminal backed by `node-pty`.
- User-configured SSH alias, Codex command, and remote project list.
- UI language switcher: Russian and English.
- Expandable Appearance panel with light/dark theme and accent color selection.
- Safe launch command shape: `ssh -tt -o BatchMode=yes -o ConnectTimeout=15 <alias> "cd <path> && <codexCommand>"`.
- Local `config.json` in Electron user data.
- Quick prompts configurable through `config.json`.
- Local quick command sets saved in app settings.
- Managed `AGENTS.md` sync with a neutral app marker.
- Local Markdown instruction import by picker or drag-and-drop.
- Local terminal history per `project.id`.
- Tray menu.
- Read-only diagnostics.

### Requirements

- macOS for the first development/testing stage.
- Node.js 24 or compatible current Node.js.
- OpenSSH client available as `ssh`.
- A working SSH alias in `~/.ssh/config`.
- `codex` or `codex-vpn` installed on the VDS.

### Quick Start On macOS

```bash
npm install
npm run check
npm start
```

On first launch the app creates a default `config.json` in Electron user data. Use **Open config file** in the app to edit it, then **Reload config**.

### SSH Config Example

The app does not create keys, store passwords, or silently create server access. Add a host like this manually to `~/.ssh/config`:

```sshconfig
Host my-vds
    HostName YOUR_SERVER_IP
    User root
    IdentityFile ~/.ssh/my_vds_key
    IdentitiesOnly yes
    PreferredAuthentications publickey
    PasswordAuthentication no
    ServerAliveInterval 30
    ServerAliveCountMax 3
```

Check it manually:

```bash
ssh my-vds
```

### config.json Example

```json
{
  "sshAlias": "my-vds",
  "codexCommand": "codex-vpn",
  "projects": [
    {
      "id": "root",
      "name": "Server root",
      "path": "/"
    },
    {
      "id": "app",
      "name": "App",
      "path": "/opt/app"
    }
  ],
  "quickPrompts": [
    {
      "id": "project-map",
      "title": "Project map",
      "text": "Analyze this repository and show a concise project map. Do not modify files."
    }
  ]
}
```

Validation rules:

- `sshAlias` must be a simple OpenSSH alias using letters, digits, dot, underscore, or dash.
- `codexCommand` must be `codex` or `codex-vpn`.
- Every project must have a non-empty `id`, `name`, and an absolute Unix `path`.

### Security Notes

- Passwords, private SSH keys, OpenAI/API tokens, `.env` files, and server credentials are not stored by the app.
- SSH access is owned by the user through normal OpenSSH configuration.
- `BatchMode=yes` is always used so SSH will not ask for passwords in the embedded terminal.
- Diagnostics are read-only.
- Local terminal history may contain sensitive output; clear it when needed.

### Build

```bash
npm run dist
```

## Русский

Codex VDS Launcher — локальное Electron-приложение со встроенным терминалом xterm.js. Оно запускает Codex CLI на удалённом сервере через пользовательский OpenSSH alias, хранит локальную историю терминала, поддерживает быстрые промпты, импорт локальных Markdown-инструкций и синхронизацию управляемого `AGENTS.md` в выбранный удалённый проект.

### Статус

Developer beta / сначала macOS. Первая публичная beta предназначена для ручного тестирования перед более широким релизом.

### Возможности

- Встроенный терминал xterm.js на `node-pty`.
- Пользовательский SSH alias, команда Codex и список удалённых проектов.
- Переключение языка интерфейса: русский и английский.
- Раскрываемая вкладка оформления со светлой/тёмной темой и выбором акцентного цвета.
- Безопасная форма запуска: `ssh -tt -o BatchMode=yes -o ConnectTimeout=15 <alias> "cd <path> && <codexCommand>"`.
- Локальный `config.json` в Electron user data.
- Быстрые промпты через `config.json`.
- Локальные быстрые команды в настройках приложения.
- Синхронизация управляемого `AGENTS.md` с нейтральным маркером приложения.
- Импорт локальных Markdown-инструкций через выбор файла или drag-and-drop.
- Локальная история терминала по `project.id`.
- Меню в системном трее.
- Read-only диагностика.

### Требования

- macOS для первого этапа разработки и тестирования.
- Node.js 24 или совместимая актуальная версия Node.js.
- OpenSSH client как команда `ssh`.
- Рабочий SSH alias в `~/.ssh/config`.
- `codex` или `codex-vpn` на VDS.

### Быстрый старт на macOS

```bash
npm install
npm run check
npm start
```

При первом запуске приложение создаёт дефолтный `config.json` в Electron user data. Используйте **Open config file** для редактирования и **Reload config** для применения.

### Пример SSH config

Приложение не создаёт ключи, не хранит пароли и не создаёт доступ к серверу молча. Добавьте такой блок в `~/.ssh/config` вручную:

```sshconfig
Host my-vds
    HostName YOUR_SERVER_IP
    User root
    IdentityFile ~/.ssh/my_vds_key
    IdentitiesOnly yes
    PreferredAuthentications publickey
    PasswordAuthentication no
    ServerAliveInterval 30
    ServerAliveCountMax 3
```

Проверьте вручную:

```bash
ssh my-vds
```

### Пример config.json

```json
{
  "sshAlias": "my-vds",
  "codexCommand": "codex-vpn",
  "projects": [
    {
      "id": "root",
      "name": "Server root",
      "path": "/"
    },
    {
      "id": "app",
      "name": "App",
      "path": "/opt/app"
    }
  ],
  "quickPrompts": [
    {
      "id": "project-map",
      "title": "Project map",
      "text": "Analyze this repository and show a concise project map. Do not modify files."
    }
  ]
}
```

Правила валидации:

- `sshAlias` — простой OpenSSH alias из букв, цифр, точки, подчёркивания или дефиса.
- `codexCommand` — только `codex` или `codex-vpn`.
- Каждый проект должен иметь непустые `id`, `name` и абсолютный Unix-путь `path`.

### Безопасность

- Приложение не хранит пароли, приватные SSH-ключи, OpenAI/API токены, `.env` файлы и серверные учётные данные.
- SSH-доступом управляет пользователь через обычный OpenSSH config.
- Всегда используется `BatchMode=yes`, поэтому SSH не спрашивает пароль во встроенном терминале.
- Диагностика read-only.
- Локальная история терминала может содержать чувствительный вывод; очищайте её при необходимости.

### Сборка

```bash
npm run dist
```
