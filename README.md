## Quaver Profile Discord Bot

## Examples

![](https://cdn.discordapp.com/attachments/1042433292034654291/1063778266500046869/example.PNG)

![](https://cdn.discordapp.com/attachments/1042433292034654291/1063785487195717692/image.png)

#### Usage

Command: `/quaver <quaver-profile-id>`

Other commands provided by the template:
- `/ping`
- `prefix`*

*: Not a slash command.

### TODO (If I even bother)

- [ ] Option/command to show more stats
- [ ] Implement more commands if possible

## Self-Hosting/Self-Dev

Clone the repository then create a file named `.env` and fill it out accordingly

```
TOKEN=
CLIENT_ID=
PREFIX=
MONGO_URI=
MONGO_DATABASE_NAME=
```

`npm i` then:

So there's 2 commands in `package.json`, "start" and "dev". 

`npm run start` will delete the `build` folder *every time you run it* before doing anything else (this could be some sort of safety measure should you delete certain files, since `tsc` doesn't.)

`npm run dev` does not delete the `build` folder, so choose whichever you want. **(maybe you can run this first if it's your first time running the bot, then run `npm run start` after that)**

> **Thanks:**
> This bot was bootstrapped with [this bot template](https://github.com/MericcaN41/discordjs-v14-template-ts).
