# RASHMI DEV

This repository contains the source for the RASHMI DEV website: its opening video, the Rashmipp game, and the PPMake portfolio.

## Run the website

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 1234
```

Open `http://127.0.0.1:1234`. The first run rebuilds the public Game and PPMake asset folders from the source folders. It also rejoins the Unity game data chunks automatically.

To create a production build:

```sh
npm run build
```

To deploy the site on Render, follow [RenderREADME.md](RenderREADME.md). The repository also includes a `render.yaml` Blueprint for one-step service configuration.

## Website sections

### Video

The opening snow video is in `PPMake/assets/snow.mp4`. The song is a separate file at `PPMake/assets/song.m4a`; the snow video has no embedded sound. Browser autoplay rules may require clicking the Video speaker button to start the song.

### Game

The Game frame embeds the Rashmipp Unity WebGL export from `Game/Rashmipp/`. Its wheel input is reversed by the wrapper page. The game data file is stored as GitHub-safe chunks in `Game/Rashmipp/Build/` and automatically reassembled before the site runs or builds.

The Desktop folder contained the playable WebGL export, not the original Unity C# project.

### PPMake

The PPMake portfolio app is embedded at `/portfolio`. Its source is in `src/`; the page shell and its media are in `PPMake/`. Video and PPMake audio controls share a single active-audio state, so switching sections mutes the previous section.

The Gmail and WhatsApp links are fixed on the left side of the page. Gmail opens `rashmiranjanabc241947@gmail.com`; WhatsApp opens a chat at `+91 7008927696`.

## Source layout

```text
Game/Rashmipp/       Unity WebGL export and scroll-input wrapper
PPMake/              Opening video, soundtrack, logo, favicon, and page shell
src/                 React portfolio application source
public/              Original app assets; Game and PPMake folders are generated
scripts/             Local asset preparation and Unity data reassembly
```

`public/Game/`, `public/PPMake/`, `public/favicon-avatar.png`, and `dist/` are generated locally and are not committed. Edit the source folders above, then run the dev server or production build to regenerate them.
