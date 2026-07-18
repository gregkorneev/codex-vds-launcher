# Codex CLI Launcher

Desktop launcher for running Codex CLI locally or on your VDS over SSH.

Русский раздел находится ниже: [Русский](#русский).

## English

Codex CLI Launcher is an Electron app with an embedded xterm.js terminal. It can start an installed Codex CLI in a local project folder or run Codex on a remote server through a user-managed OpenSSH alias.

### Status

Stable. The first stable release is **[Codex CLI Launcher v1.0.0](https://github.com/gregkorneev/codex-vds-launcher/releases/tag/v1.0.0)**. It consolidates all features delivered from Developer Beta 1 through Developer Beta 9.

### Features

- Embedded xterm.js terminal backed by `node-pty`.
- Local Codex CLI sessions with a native project-folder picker.
- Explicit Settings switch between local mode and VDS over SSH; VDS-only UI is hidden in local mode.
- Custom local and VDS projects from the `＋` button, stored separately in `user-projects.json`, with safe removal that leaves project files untouched.
- Isolated Web/PWA project storage at `profiles/<profile>/projects.json`.
- User-configured SSH alias, Codex command, and remote project list.
- UI language switcher: Russian and English.
- First-launch and post-update welcome screen with a bilingual “What changed” summary.
- Expandable Settings panel with working mode, language, light/dark theme, and accent color selection.
- Safe launch command shape: `ssh -tt -o BatchMode=yes -o ConnectTimeout=15 <alias> "cd <path> && <codexCommand>"`.
- Local `config.json` in Electron user data.
- Quick prompts and command sets shown as one collapsible Quick actions list.
- Working-mode shortcuts in the macOS Connection menu and the Windows tray.
- Expandable Codex account profile with plan, remaining limits, and reset times for the active mode.
- Managed `AGENTS.md` sync with a neutral app marker.
- Local Markdown instruction import by picker or drag-and-drop.
- Local terminal history per `project.id`.
- Markdown export of the latest run for each session.
- Tray menu.
- Persistent collapsible Projects, Sessions, Settings, Server Status, Updates, Local MD, and Quick actions sections with visible arrow indicators.
- Compact read-only VDS/SSH/Codex/VPN status cards; the separate Diagnostics UI was removed.

Stable release artifacts and the installed application are named **Codex CLI Launcher**. Developer Beta 9 remains available in the GitHub Releases history for prerelease testing.

### Requirements

- macOS on Apple Silicon or Windows x64.
- Node.js 24 or compatible current Node.js.
- OpenSSH client available as `ssh` for VDS sessions.
- A local `codex` executable in `PATH` for local sessions.
- A working SSH alias in `~/.ssh/config`.
- `codex` installed on the VDS. `codex-vpn` is optional and should be used only if you created that wrapper yourself.

### Quick Start On macOS

```bash
npm install
npm run check
npm start
```

On first launch the app creates a default `config.json` in Electron user data. Use **Open config file** in the app to edit it, then **Reload config**.

### VDS Setup

See the detailed guide: [docs/vds-setup.md](docs/vds-setup.md).

Short version:

```bash
ssh root@YOUR_SERVER_IP
curl -fsSL https://chatgpt.com/codex/install.sh | sh
codex
```

The first `codex` run asks you to sign in with your ChatGPT account or an API
key. After that, configure a local OpenSSH alias and set `"codexCommand":
"codex"` in the app config.

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
  "codexCommand": "codex",
  "projectsRoot": "/opt",
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
- `codexCommand` must be `codex` or `codex-vpn`. Use `codex` by default; `codex-vpn` is only an optional custom wrapper.
- `projectsRoot` is the VDS directory whose descendants may be selected by the add-project dialog.
- Every project must have a non-empty `id`, `name`, and an absolute Unix `path`.

### Security Notes

- Passwords, private SSH keys, OpenAI/API tokens, `.env` files, and server credentials are not stored by the app.
- SSH access is owned by the user through normal OpenSSH configuration.
- `BatchMode=yes` is always used so SSH will not ask for passwords in the embedded terminal.
- Server status cards are read-only.
- Local terminal history may contain sensitive output; clear it when needed.

### License

This project is released under the MIT License. See [LICENSE](./LICENSE).

### Notice / Attribution

This project was initially extracted and generalized from KORNIX Codex Launcher. See [NOTICE.md](./NOTICE.md).

### OpenAI / Codex Disclaimer

Codex CLI Launcher is not affiliated with, endorsed by, or sponsored by OpenAI. Codex is a product and/or trademark of OpenAI.

### License Audit

```bash
npm run license:summary
npm run license:prod
```

### Build

```bash
npm run dist:mac
npm run dist:win
```

The macOS target produces a `.dmg` and `.zip`; the `.zip` is required for Electron auto-update metadata. The Windows target produces an NSIS `.exe`.

### Updates

The app uses GitHub Releases through `electron-updater`.

```bash
npm run publish:beta
npm run publish:release
```

Beta builds use the `beta` update channel and stable builds use `latest`. Ad-hoc macOS packages open the exact official release page for manual DMG installation; Windows and trusted macOS packages retain automatic installation.

### Release checklist

Every release must update `RELEASE_CHANGES` in `src/renderer/app.js`. Tag workflows build and verify artifacts; the maintainer publishes the GitHub release from their own account so the release author is not `github-actions`.

## Русский

Codex CLI Launcher — Electron-приложение со встроенным терминалом xterm.js. Оно запускает установленный Codex CLI в локальной папке проекта или на удалённом сервере через пользовательский OpenSSH alias.

### Статус

Стабильная версия. Первый стабильный релиз — **[Codex CLI Launcher v1.0.0](https://github.com/gregkorneev/codex-vds-launcher/releases/tag/v1.0.0)**. Он объединяет все функции, выпущенные с Developer Beta 1 по Developer Beta 9 включительно.

### Возможности

- Встроенный терминал xterm.js на `node-pty`.
- Локальные Codex CLI-сессии с нативным выбором папки проекта.
- Явный переключатель в «Настройках» между локальным режимом и VDS через SSH; в локальном режиме VDS-разделы скрыты.
- Пользовательские локальные и VDS-проекты через кнопку `＋`, отдельно сохранённые в `user-projects.json`; удаление из Launcher не затрагивает папки и файлы.
- Изолированное хранилище проектов Web/PWA в `profiles/<profile>/projects.json`.
- Пользовательский SSH alias, команда Codex и список удалённых проектов.
- Переключение языка интерфейса: русский и английский.
- Приветственный экран первого запуска и после каждого обновления с двуязычным списком изменений.
- Раскрываемая вкладка «Настройки» с режимом работы, языком, светлой/тёмной темой и выбором акцентного цвета.
- Безопасная форма запуска: `ssh -tt -o BatchMode=yes -o ConnectTimeout=15 <alias> "cd <path> && <codexCommand>"`.
- Локальный `config.json` в Electron user data.
- Быстрые промпты и команды показаны единым сворачиваемым списком «Быстрые действия».
- Выбор режима продублирован в меню «Подключение» на macOS и в трее Windows.
- Раскрываемый профиль Codex показывает аккаунт, план, остаток лимитов и время их обновления для текущего режима.
- Синхронизация управляемого `AGENTS.md` с нейтральным маркером приложения.
- Импорт локальных Markdown-инструкций через выбор файла или drag-and-drop.
- Локальная история терминала по `project.id`.
- Выгрузка последнего запуска каждой сессии в Markdown.
- Меню в системном трее.
- Сворачиваемые разделы «Проекты», «Сессии», «Настройки», «Статус сервера», «Обновления», «Локальные MD» и «Быстрые действия» со стрелками и сохранением состояния.
- Компактные read-only карточки VDS/SSH/Codex/VPN; отдельный интерфейс «Диагностика» удалён.

Стабильные артефакты и установленное приложение называются **Codex CLI Launcher**. Developer Beta 9 остаётся доступна в истории GitHub Releases для prerelease-тестирования.

### Требования

- macOS на Apple Silicon или Windows x64.
- Node.js 24 или совместимая актуальная версия Node.js.
- OpenSSH client как команда `ssh` для VDS-сессий.
- Локальная команда `codex` в `PATH` для локальных сессий.
- Рабочий SSH alias в `~/.ssh/config`.
- `codex` на VDS. `codex-vpn` нужен только если вы сами создали такую обёртку.

### Быстрый старт на macOS

```bash
npm install
npm run check
npm start
```

При первом запуске приложение создаёт дефолтный `config.json` в Electron user data. Используйте **Open config file** для редактирования и **Reload config** для применения.

### Настройка VDS

Подробная инструкция: [docs/vds-setup.md](docs/vds-setup.md).

Короткая версия:

```bash
ssh root@YOUR_SERVER_IP
curl -fsSL https://chatgpt.com/codex/install.sh | sh
codex
```

Первый запуск `codex` попросит авторизоваться через ChatGPT account или API key.
После этого настройте локальный OpenSSH alias и укажите `"codexCommand": "codex"`
в config приложения.

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
  "codexCommand": "codex",
  "projectsRoot": "/opt",
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
- `codexCommand` — только `codex` или `codex-vpn`. По умолчанию используйте `codex`; `codex-vpn` — только опциональная пользовательская обёртка.
- Каждый проект должен иметь непустые `id`, `name` и абсолютный Unix-путь `path`.

### Безопасность

- Приложение не хранит пароли, приватные SSH-ключи, OpenAI/API токены, `.env` файлы и серверные учётные данные.
- SSH-доступом управляет пользователь через обычный OpenSSH config.
- Всегда используется `BatchMode=yes`, поэтому SSH не спрашивает пароль во встроенном терминале.
- Карточки статуса сервера выполняют только read-only проверки.
- Локальная история терминала может содержать чувствительный вывод; очищайте её при необходимости.

### Лицензия

Проект опубликован под MIT License. См. [LICENSE](./LICENSE).

### Notice / атрибуция

Проект был изначально выделен и обобщён из KORNIX Codex Launcher. См. [NOTICE.md](./NOTICE.md).

### OpenAI / Codex disclaimer

Codex CLI Launcher не аффилирован, не одобрен и не спонсируется OpenAI. Codex является продуктом и/или товарным знаком OpenAI.

### Аудит лицензий

```bash
npm run license:summary
npm run license:prod
```

### Сборка

```bash
npm run dist:mac
npm run dist:win
```

Цель macOS создаёт `.dmg` и `.zip`; `.zip` нужен для metadata автообновлений Electron. Цель Windows создаёт NSIS `.exe`.

### Обновления

Приложение использует GitHub Releases через `electron-updater`.

```bash
npm run publish:beta
npm run publish:release
```

Beta-сборки используют канал `beta`, стабильные — `latest`. Ad-hoc macOS-сборка открывает страницу конкретного официального релиза для ручной установки DMG; Windows и macOS со доверенной подписью сохраняют автоматическую установку.

### Чек-лист релиза

В каждом релизе нужно обновлять `RELEASE_CHANGES` в `src/renderer/app.js`. Workflow по тегу собирает и проверяет артефакты; GitHub-релиз публикует владелец репозитория из своего аккаунта, поэтому автором не становится `github-actions`.
