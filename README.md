# Our Minehut Panel
This frontend runs on Minehut's Dev servers. You must make a new account there if you don't already have one. You cannot use your production ("normal") minehut account. If you do not know what this means, just follow the login steps, but make an account first.
If for whatever reason you don't want to use the dev servers, it is extremely easy to switch over to the normal ones (just remove the `.dev` in all API urls)

As this is built entirely from scratch, without using any minehut's code, there are some features that this panel will be missing, especially as they continue to add new features. If you think that you can help us add features, please, make a PR! If you want to suggest a feature but don't know how to code it, make a Issue. If you found a bug, please make a Issue.

Frontend is in the `views/` folder.

The API middleware is in the `index.js` file. This middleware handles authentication, proxying API requests, and the websocket connection for the console.

### This project does not use *any* minehut code. Everything is coded from the ground up.

## This project will *never* handle any payment processing. If you want to buy credits, you must use the official minehut panel to do so.
We will allow you to use credits that you already have (buying ranks, server plans, etc.)

# Images:

### Server list:
![{4836EE45-6ABF-4EA3-B57B-5DC75ACE7F51}](https://github.com/user-attachments/assets/c463d3e4-e3d4-4192-98eb-e8edb33ad0bd)

### Console tab:
![{AD2F58F8-BACA-439A-A192-3FF7274C3ED3}](https://github.com/user-attachments/assets/4a0a2957-66a3-41db-aa6e-990244b54e52)

### Settings tab:
![image](https://github.com/user-attachments/assets/ed5044c6-b139-4ec0-b643-64b05148bd36)

![image](https://github.com/user-attachments/assets/162f4fea-c486-4fb0-b72a-014d48190f35)

### Stats tab:
![image](https://github.com/user-attachments/assets/d0e2b286-6549-43ed-80ed-c70d150dd4f9)
![image](https://github.com/user-attachments/assets/c5a8c26f-a491-46e9-8369-522e5fc13fab)

### File manager:
* Todo: Make file manager

# TODO:
### In order of priority:
- Allow users to modify ports.
- Make the file manager.
- Add force hibernation button.
- Add MOTD changer.
- Show SFTP info.
- Add better version switcher.
- Add external domain support.
- Add better plan switcher.
- Add re-ordering servers.
- Add renaming servers.
- Add server discovery settings.
- Add backup support.
- Add user page (minecraft / GS linking, transaction log, etc).
- Add resource pack support.
- Add world settings / upload.
- Add better subuser support.
- Add mobile support.
- Add external server support.
- Add public server list.
- Add proxy support.
- Add advertising support.
- Add toggling cosmetics.
- Changing FMCS link.

# What will *not* be added:
I refuse to mess with the payment system, period. You will not be able to buy credits using this panel. Please use the official panel for purchases.