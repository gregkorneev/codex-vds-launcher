# Usage

Codex VDS Launcher is currently intended for local macOS development and manual testing from source.

## Install And Run From Source

```bash
npm install
npm run check
npm start
```

If Electron starts successfully, configure the app from the left sidebar.

## Configure SSH Alias

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

The app always uses `BatchMode=yes`, so SSH password prompts are disabled.

## Configure config.json

On first launch the app creates `config.json` in Electron user data. Use **Open config file** to edit it and **Reload config** to apply changes without restarting.

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

Validation:

- `sshAlias`: letters, digits, dot, underscore, or dash.
- `codexCommand`: only `codex` or `codex-vpn`.
- `projects[].id`: letters, digits, underscore, or dash.
- `projects[].name`: non-empty.
- `projects[].path`: absolute Unix path beginning with `/`.

## Add Projects

Add entries to `projects`:

```json
{
  "id": "api",
  "name": "API",
  "path": "/opt/api"
}
```

History is stored by `project.id`. If a project is later removed from `config.json`, old history is ignored rather than crashing the app.

## Choose codex Or codex-vpn

Set:

```json
"codexCommand": "codex"
```

or:

```json
"codexCommand": "codex-vpn"
```

Other values are rejected.

## Start A Session

Select a project and press the play button. The remote launch command is built from validated config values:

```bash
ssh -tt -o BatchMode=yes -o ConnectTimeout=15 my-vds "cd /opt/app && codex-vpn"
```

If AGENTS sync is enabled, the app updates `AGENTS.md` before starting Codex. It will not overwrite an existing file unless it contains:

```html
<!-- Managed by Codex VDS Launcher -->
```

## Quick Prompts

Quick prompts are read from `config.json`. Press a prompt to insert it into the active Codex session.

Default prompts include project map, Git status, plan before changes, Docker overview, server health, and safe production check.

## Quick Commands

Quick command sets are local UI conveniences saved in app settings. They are sent only to the active terminal session.

## Markdown Instructions

Use **Выполнить Markdown** or drag a `.md` / `.markdown` file into the drop zone. The app reads the local file and pastes its content into the active Codex session. The remote server never receives local filesystem access.

Maximum file size is 256 KB.

## Clear History

Use **Очистить историю** in the left sidebar. Local terminal buffers for all projects are removed.

## Diagnostics

Diagnostics are read-only:

- SSH check.
- Remote `whoami`, `hostname`, `pwd`.
- Codex command lookup.
- VPN command lookup when `codex-vpn` is selected.
- Server health: `uptime`, `df -h`, memory.
- Git status for the current project.
- Docker compose file listing and `docker ps` when Docker is available.

## Troubleshooting

`OpenSSH client was not found`:
Install OpenSSH or ensure `ssh` is in `PATH`.

`SSH alias was not found`:
Add the host block to `~/.ssh/config`, test `ssh my-vds`, then press **Reload config**.

`Invalid codexCommand`:
Use only `codex` or `codex-vpn`.

`Some projects were ignored`:
Check that each project has a valid `id`, non-empty `name`, and absolute Unix `path`.

Codex session exits immediately:
Run `ssh my-vds` manually and check whether `codex` or `codex-vpn` is installed on the server.
