# VDS Connection Setup

## English

Codex VDS Launcher uses your normal OpenSSH configuration. It does not create
server accounts, store passwords, or store private SSH keys.

1. Create or choose an SSH key:

   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/my_vds_key
   ```

2. Add the public key to your VDS:

   ```bash
   ssh-copy-id -i ~/.ssh/my_vds_key.pub root@YOUR_SERVER_IP
   ```

3. Add an alias to `~/.ssh/config`:

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

4. Test the alias in Terminal:

   ```bash
   ssh my-vds
   ```

5. In the app, open `config.json` and set:

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

   Use `codex-vpn` only if you created that wrapper on your VDS and want the app
   to run it instead of plain `codex`.

6. Reload config in the app and start a session with the play button or a
   project start button.

## Русский

Codex VDS Launcher использует обычную конфигурацию OpenSSH. Приложение не
создаёт учётки на сервере, не хранит пароли и не хранит приватные SSH-ключи.

1. Создайте или выберите SSH-ключ:

   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/my_vds_key
   ```

2. Добавьте публичный ключ на VDS:

   ```bash
   ssh-copy-id -i ~/.ssh/my_vds_key.pub root@YOUR_SERVER_IP
   ```

3. Добавьте alias в `~/.ssh/config`:

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

4. Проверьте alias в Terminal:

   ```bash
   ssh my-vds
   ```

5. В приложении откройте `config.json` и настройте:

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

   Используйте `codex-vpn` только если вы сами создали такую обёртку на VDS и
   хотите запускать её вместо обычного `codex`.

6. Перезагрузите config в приложении и запустите сессию кнопкой запуска сверху
   или кнопкой старта у проекта.
