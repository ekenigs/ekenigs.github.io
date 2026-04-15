## Deploying to GitHub Pages

Deployment uses the **same repository** as the source: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) checks out this repo, runs `pnpm build`, and publishes the build output to GitHub Pages for [`ekenigs/ekenigs.github.io`](https://github.com/ekenigs/ekenigs.github.io). You do not need a separate deploy-only repository.

**Live site:** [https://ekenigs.github.io/](https://ekenigs.github.io/) — a repo named `username.github.io` is a [user site](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites), served at the site root (not under `/repo-name`).

**Repository setup (once):** In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.

**Custom domain (optional):** Add `public/CNAME`, configure DNS, set `site` in `astro.config.ts`, and remove `base` if you had one — see [Change your GitHub URL to a custom domain](https://docs.astro.build/en/guides/deploy/github/#change-your-github-url-to-a-custom-domain) in the Astro docs.
