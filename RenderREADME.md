# Host RASHMI DEV on Render

Yes. This project can be hosted on Render as a **Static Site**. It is a built Vite website, so Render publishes the files in `dist`; you do not need a web service, server start command, or port setting.

## Deploy from GitHub (recommended)

The project is in [rashmiranjanaiet/DEV-RASHMI](https://github.com/rashmiranjanaiet/DEV-RASHMI), on the `main` branch. The repository contains a `render.yaml` Blueprint with the build, publish folder, and page routing already configured.

1. Sign in or create an account at [render.com](https://render.com/).
2. Connect your Render account to GitHub and allow Render to access `rashmiranjanaiet/DEV-RASHMI`.
3. In the Render Dashboard, select **New** → **Blueprint**.
4. Choose the `rashmiranjanaiet/DEV-RASHMI` repository and the `main` branch, then select **Apply**.
5. Render reads `render.yaml`, installs packages, builds the site, and publishes `dist`. Watch the service's **Events** or **Deploys** page until the first deployment says **Live**.
6. Open the `https://dev-rashmi.onrender.com` address shown on the service page. If that name is already taken, Render may ask you to choose another service name; use the URL Render displays.

Render automatically deploys future commits pushed to `main`.

## Create it manually instead

If you choose **New** → **Static Site** instead of Blueprint, connect the same GitHub repository and enter:

| Render setting | Value |
| --- | --- |
| Repository | `rashmiranjanaiet/DEV-RASHMI` |
| Branch | `main` |
| Root Directory | Leave blank (the app is at the repository root) |
| Build Command | `npm ci && npm run build` |
| Publish Directory | `dist` |

There is no start command and no port to enter. The `prebuild` script in `package.json` automatically rejoins the Unity game data chunks and prepares the Game and PPMake files before Vite creates `dist`.

For manual setup, add these **Rewrite** rules in the static site's **Redirects/Rewrites** settings, in this order:

| Source | Destination | Action |
| --- | --- | --- |
| `/start` | `/start/index.html` | Rewrite |
| `/start/` | `/start/index.html` | Rewrite |
| `/*` | `/index.html` | Rewrite |

The first two preserve the standalone `/start` page. The last sends app routes such as `/portfolio` back to the Vite entry page. Render serves real files at their paths before applying rewrite rules, so game and media files continue to load normally.

## Check the deployed site

After the status is **Live**, open the service URL and check:

- The opening snow video displays and its music control responds to a click.
- The Game frame loads the Rashmipp Unity build. The first game load can take a while because its data file is large.
- The PPMake frame and its sound control work.
- Refreshing `/portfolio` still loads the portfolio rather than a 404.
- `/start` displays the standalone start page.

If the build fails, open the service's **Deploys** page, select the failed deploy, and read the build log. Confirm that **Root Directory** is blank, **Build Command** is `npm ci && npm run build`, and **Publish Directory** is `dist`. To retry without cached build files, use **Manual Deploy** → **Clear build cache & deploy**.

## Game size and bandwidth

The Unity WebGL game data is about 378 MB before transfer. This repository stores it in GitHub-sized chunks; the build script reassembles the chunks during each build. That means the first game load for a visitor is large and may be slow on mobile or limited connections.

Render counts files sent to visitors as outbound bandwidth. The current Hobby workspace allowance is 5 GB per month; overages are billed at the rate shown in Render's current pricing, or services can be suspended until the next month if no payment method is on file. A 378 MB game download alone is roughly twelve full downloads per 5 GB, before the rest of the site and transfer overhead. Check your workspace's **Billing** and the site's **Metrics** pages as traffic grows. See [Render outbound bandwidth](https://render.com/docs/outbound-bandwidth) for current limits and billing.

## Optional custom domain

In the static site's **Settings**, add your domain under **Custom Domains**. Render will show the DNS records to add at your domain provider. Wait for domain verification and the managed TLS certificate before sharing the custom domain. Details: [Render custom domains](https://render.com/docs/custom-domains).

## Official Render documentation

- [Static Sites](https://render.com/docs/static-sites)
- [Static Site redirects and rewrites](https://render.com/docs/redirects-rewrites)
- [Deploying from GitHub](https://render.com/docs/git-provider)
- [Outbound bandwidth](https://render.com/docs/outbound-bandwidth)
