# Codex VDS Launcher

Desktop launcher for running Codex CLI on your VDS over SSH.

Codex VDS Launcher is a local Electron app with an embedded xterm.js terminal. It starts Codex CLI on a remote server through a user-managed OpenSSH alias, keeps local terminal history, supports quick prompts, imports local Markdown instructions, and can sync a managed `AGENTS.md` into the selected remote project.

## Status

Development / macOS-first. Releases are not published yet and will not be prepared without a separate owner decision.

## Features

- Embedded xterm.js terminal backed by `node-pty`.
- User-configured SSH alias, Codex command, and remote project list.
- Safe launch command shape: `ssh -tt -o BatchMode=yes -o ConnectTimeout=15 <alias> "cd <path> && <codexCommand>"`.
- Local `config.json` in Electron user data.
- Quick prompts configurable through `config.json`.
- Local quick command sets saved in app settings.
- Managed `AGENTS.md` sync with a neutral app marker.
- Local Markdown instruction import by picker or drag-and-drop.
- Local terminal history per `project.id`.
- Light and dark themes.
- Tray menu.
- Read-only diagnostics.

## Requirements

- macOS for the first development/testing stage.
- Node.js 24 or compatible current Node.js.
- OpenSSH client available as `ssh`.
- A working SSH alias in `~/.ssh/config`.
- `codex` or `codex-vpn` installed on the VDS.

## Quick Start On macOS

```bash
npm install
npm run check
npm start
```

On first launch the app creates a default `config.json` in Electron user data. Use **Open config file** in the app to edit it, then **Reload config**.

## SSH Config Example

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

## config.json Example

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
    },
    {
      "id": "git-status",
      "title": "Git status",
      "text": "Show git status, current branch, remotes, and recent commits. Do not modify files."
    }
  ]
}
```

Validation rules:

- `sshAlias` must be a simple OpenSSH alias using letters, digits, dot, underscore, or dash.
- `codexCommand` must be `codex` or `codex-vpn`.
- Every project must have a non-empty `id`, `name`, and an absolute Unix `path`.

## Security Notes

- Passwords, private SSH keys, OpenAI/API tokens, `.env` files, and server credentials are not stored by the app.
- SSH access is owned by the user through normal OpenSSH configuration.
- `BatchMode=yes` is always used so SSH will not ask for passwords in the embedded terminal.
- Diagnostics are read-only.
- Local terminal history may contain sensitive output; clear it when needed.

## Build

Local build commands exist for development only:

```bash
npm run dist
```

The project currently avoids GitHub Release publishing. GitHub Actions only checks sources and builds with `--publish never`.
