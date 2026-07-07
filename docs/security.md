# Security

Codex VDS Launcher is a local desktop wrapper around OpenSSH and Codex CLI. It is not a credential manager and does not provision server access.

## Secrets

The app does not store:

- passwords;
- private SSH keys;
- OpenAI/API tokens;
- `.env` files;
- server credentials.

SSH keys and aliases are managed by the user through normal OpenSSH configuration, ssh-agent, keychain, or platform tools.

## SSH Behavior

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

## Validation

SSH commands are built from validated values:

- `sshAlias` must be a simple alias using letters, digits, dot, underscore, or dash.
- `project.path` must be an absolute Unix path and is shell-quoted before use.
- `codexCommand` is whitelisted to `codex` or `codex-vpn`.

Arbitrary configured launch commands are not accepted.

## AGENTS.md

When enabled, the app syncs a managed `AGENTS.md` into the selected remote project before starting Codex.

The managed marker is:

```html
<!-- Managed by Codex VDS Launcher -->
```

If a remote project already has an `AGENTS.md` without that marker, the app leaves it unchanged and prints a warning in the terminal.

## Local History

Terminal history is stored locally in Electron user data as `codex-history.json`. It can contain sensitive output from remote commands or Codex sessions. Clear history from the app when needed.

## Diagnostics

Diagnostics are intended to be read-only. They inspect SSH connectivity, remote identity, command availability, server health, Git status, and Docker state without restarting services, running migrations, deleting files, changing firewall settings, changing SSH/VPN/systemd state, or modifying databases.

## User Responsibility

The user is responsible for:

- SSH config correctness;
- private key storage and permissions;
- remote user permissions;
- server hardening;
- choosing whether `codex` or `codex-vpn` is appropriate for the environment.
