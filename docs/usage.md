# Usage / Использование

Русский раздел находится ниже: [Русский](#русский).

## English

Codex VDS Launcher is currently intended for local macOS development and manual testing from source.

### Install And Run From Source

```bash
npm install
npm run check
npm start
```

### Configure SSH Alias

Create or edit `~/.ssh/config` yourself. The app only checks whether the alias exists; it does not create access, keys, or passwords.

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

Verify access before starting a Codex session:

```bash
ssh my-vds
```

### Configure config.json

On first launch the app creates `config.json` in Electron user data. Use **Open config file** to edit it and **Reload config** to apply changes without restarting.

```json
{
  "sshAlias": "my-vds",
  "codexCommand": "codex",
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

### Language And Customization

Open **Customization** to switch between Russian and English, choose light/dark theme, and pick one of the accent colors.

These preferences are stored locally in `codex-settings.json`.

### Add Projects

Add entries to `projects`:

```json
{
  "id": "api",
  "name": "API",
  "path": "/opt/api"
}
```

History is stored by `project.id`. If a project is later removed from `config.json`, old history is ignored rather than crashing the app.

### Choose codex Or codex-vpn

Use plain `codex` unless you have intentionally created a `codex-vpn` wrapper on the VDS.

Set:

```json
"codexCommand": "codex"
```

or:

```json
"codexCommand": "codex-vpn"
```

Other values are rejected. `codex-vpn` is not installed by this app and is not required for normal use.

### Start A Session

Select a project and press the play button. The remote launch command is built from validated config values:

```bash
ssh -tt -o BatchMode=yes -o ConnectTimeout=15 my-vds "cd /opt/app && codex"
```

If AGENTS sync is enabled, the app updates `AGENTS.md` before starting Codex. It will not overwrite an existing file unless it contains:

```html
<!-- Managed by Codex VDS Launcher -->
```

### Quick Prompts

Quick prompts are editable in the app and stored in `config.json`. Press a prompt to insert it into the active Codex session.

### Markdown Instructions

Use **Run Markdown** or drag a `.md` / `.markdown` file into the drop zone. The app reads the local file and pastes its content into the active Codex session. The remote server never receives local filesystem access.

Maximum file size is 256 KB.

### Diagnostics

Diagnostics are read-only: SSH check, remote identity, command availability, server health, Git status, and Docker state.

### Troubleshooting

`OpenSSH client was not found`: install OpenSSH or ensure `ssh` is in `PATH`.

`SSH alias was not found`: add the host block to `~/.ssh/config`, test `ssh my-vds`, then press **Reload config**.

`Invalid codexCommand`: use only `codex` or `codex-vpn`.

## Русский

Codex VDS Launcher сейчас рассчитан на локальную разработку под macOS и ручное тестирование из исходников.

### Установка и запуск из исходников

```bash
npm install
npm run check
npm start
```

### Настройка SSH alias

Создайте или отредактируйте `~/.ssh/config` самостоятельно. Приложение только проверяет наличие alias; оно не создаёт доступ, ключи или пароли.

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

Проверьте доступ перед запуском Codex-сессии:

```bash
ssh my-vds
```

### Настройка config.json

При первом запуске приложение создаёт `config.json` в Electron user data. Используйте **Open config file** для редактирования и **Reload config** для применения без перезапуска.

```json
{
  "sshAlias": "my-vds",
  "codexCommand": "codex",
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

### Язык и кастомизация

Откройте **Кастомизация**, чтобы переключить язык: русский или английский, выбрать светлую/тёмную тему и акцентный цвет.

Эти настройки хранятся локально в `codex-settings.json`.

### Добавление проектов

Добавьте записи в `projects`:

```json
{
  "id": "api",
  "name": "API",
  "path": "/opt/api"
}
```

История хранится по `project.id`. Если проект позже удалить из `config.json`, старая история игнорируется, а приложение не падает.

### Выбор codex или codex-vpn

Используйте обычный `codex`, если вы специально не создали на VDS обёртку `codex-vpn`.

Укажите:

```json
"codexCommand": "codex"
```

или:

```json
"codexCommand": "codex-vpn"
```

Другие значения отклоняются. `codex-vpn` не устанавливается этим приложением и не нужен для обычного использования.

### Запуск сессии

Выберите проект и нажмите кнопку запуска. Удалённая команда строится из валидированных значений:

```bash
ssh -tt -o BatchMode=yes -o ConnectTimeout=15 my-vds "cd /opt/app && codex"
```

Если синхронизация AGENTS включена, приложение обновляет `AGENTS.md` перед запуском Codex. Существующий файл не будет перезаписан, если в нём нет маркера:

```html
<!-- Managed by Codex VDS Launcher -->
```

### Быстрые промпты

Быстрые промпты редактируются в приложении и сохраняются в `config.json`. Нажмите промпт, чтобы вставить его в активную Codex-сессию.

### Markdown-инструкции

Используйте **Run Markdown** или перетащите `.md` / `.markdown` файл в drop zone. Приложение читает локальный файл и вставляет его содержимое в активную Codex-сессию. Удалённый сервер не получает доступ к локальной файловой системе.

Максимальный размер файла — 256 KB.

### Диагностика

Диагностика read-only: SSH check, удалённая идентичность, наличие команд, здоровье сервера, Git status и состояние Docker.

### Troubleshooting

`OpenSSH client was not found`: установите OpenSSH или добавьте `ssh` в `PATH`.

`SSH alias was not found`: добавьте host block в `~/.ssh/config`, проверьте `ssh my-vds`, затем нажмите **Reload config**.

`Invalid codexCommand`: используйте только `codex` или `codex-vpn`.
