# VDS Connection Setup

## English

Codex CLI Launcher uses your normal OpenSSH configuration. It does not create
server accounts, store passwords, or store private SSH keys.

1. Install Codex CLI on the VDS.

   Connect to the server and use the official macOS/Linux installer:

   ```bash
   ssh root@YOUR_SERVER_IP
   curl -fsSL https://chatgpt.com/codex/install.sh | sh
   codex
   ```

   The first `codex` run asks you to sign in with your ChatGPT account or an
   API key. After sign-in, leave the server shell and continue with local SSH
   setup on your computer.

2. Create or choose a local SSH key:

   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/my_vds_key
   ```

3. Add the public key to your VDS:

   ```bash
   ssh-copy-id -i ~/.ssh/my_vds_key.pub root@YOUR_SERVER_IP
   ```

4. Add an alias to your local `~/.ssh/config`:

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

5. Test the alias in Terminal:

   ```bash
   ssh my-vds
   ```

6. In the app, open `config.json` and set:

   ```json
   {
     "sshAlias": "my-vds",
     "codexCommand": "codex",
     "projects": [
       {
         "id": "app",
         "name": "App",
         "path": "/opt/app"
       }
     ]
   }
   ```

   Keep `codexCommand` as `codex` for a normal setup.

7. `codex-vpn` is optional and advanced.

   It is not part of Codex CLI and is not installed by Codex CLI Launcher. Use
   it only if you intentionally created a custom `codex-vpn` wrapper on your VDS
   and want the app to run that wrapper instead of plain `codex`.

8. Reload config in the app and start a session with the play button or a
   project start button.

## Русский

Codex CLI Launcher использует обычную конфигурацию OpenSSH. Приложение не
создаёт учётки на сервере, не хранит пароли и не хранит приватные SSH-ключи.

1. Установите Codex CLI на VDS.

   Подключитесь к серверу и используйте официальный installer для macOS/Linux:

   ```bash
   ssh root@YOUR_SERVER_IP
   curl -fsSL https://chatgpt.com/codex/install.sh | sh
   codex
   ```

   Первый запуск `codex` попросит авторизоваться через ChatGPT account или API
   key. После авторизации выйдите из серверной shell и продолжайте локальную
   настройку SSH на своём компьютере.

2. Создайте или выберите локальный SSH-ключ:

   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/my_vds_key
   ```

3. Добавьте публичный ключ на VDS:

   ```bash
   ssh-copy-id -i ~/.ssh/my_vds_key.pub root@YOUR_SERVER_IP
   ```

4. Добавьте alias в локальный `~/.ssh/config`:

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

5. Проверьте alias в Terminal:

   ```bash
   ssh my-vds
   ```

6. В приложении откройте `config.json` и настройте:

   ```json
   {
     "sshAlias": "my-vds",
     "codexCommand": "codex",
     "projects": [
       {
         "id": "app",
         "name": "App",
         "path": "/opt/app"
       }
     ]
   }
   ```

   Для обычной настройки оставьте `codexCommand` равным `codex`.

7. `codex-vpn` — необязательный продвинутый вариант.

   Это не часть Codex CLI, и Codex CLI Launcher его не устанавливает.
   Используйте `codex-vpn` только если вы осознанно создали такую пользовательскую
   обёртку на VDS и хотите запускать её вместо обычного `codex`.

8. Перезагрузите config в приложении и запустите сессию кнопкой запуска сверху
   или кнопкой старта у проекта.
