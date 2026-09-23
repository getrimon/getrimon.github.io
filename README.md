# Get Rimon — Portfolio Website

Plain HTML/CSS/JS. No build step, no framework — upload straight to GitHub Pages and edit any file directly.

## Structure
```
index.html, work.html, services.html, about.html, contact.html, project.html, 404.html
css/style.css       — all styling
js/main.js          — nav, animations, and rendering of config/project data
config/site.js      — brand name, tagline, email, WhatsApp, socials, site URL
data/projects.js    — every project shown on the site
assets/favicon.svg
robots.txt, sitemap.xml
```

## Edit contact info / branding
Open `config/site.js` and change the values (email, WhatsApp link, Facebook, LinkedIn, GitHub, site URL). Every page reads from this one file.

## Add a project
Open `data/projects.js` and copy one object inside the `PROJECTS` array, then edit its fields. Set `featured: true` to show it on the home page. It automatically appears on `work.html` and gets its own page at `project.html?p=your-slug`.

## Edit a project
Change the fields on its object in `data/projects.js`.

## Delete a project
Remove its object from the `PROJECTS` array.

## Feature / unfeature a project
Toggle `featured: true` / `featured: false`.

## Add project images
Set `thumbnail` to an image URL or a path under `assets/`. Add more images to the `gallery` array for the project's detail-page gallery.

## Add a project video
Set `video` to a YouTube/Vimeo embed URL or a direct `.mp4` URL. Leave it as `""` to hide the video section — images are used automatically.

## Deploy to GitHub Pages
1. Create a repo named `rimon-babu.github.io` (or any name — for a project site, GitHub Pages serves it at `username.github.io/repo-name/`).
2. Push all these files to the repo's default branch.
3. In the repo **Settings → Pages**, set the source to the branch/root.
4. Your site is live at `https://rimon-babu.github.io/`.

## Connect a custom domain later (e.g. getrimon.com)
1. In `config/site.js`, change `siteUrl` to `https://getrimon.com`.
2. Update the `canonical` and `og:*` meta tags in each HTML file's `<head>`, and the URLs in `robots.txt` and `sitemap.xml`, from `rimon-babu.github.io` to `getrimon.com`.
3. In repo **Settings → Pages**, add your custom domain — GitHub creates the `CNAME` file for you.
4. Point your domain's DNS to GitHub Pages (GitHub's docs list the required A/CNAME records).

No other code changes are needed — nothing else hardcodes the domain.

## Notes
- All routing is plain multi-page (no client-side router), so page refresh always works on GitHub Pages.
- The project detail page uses a query parameter (`?p=slug`), which is static-hosting friendly.
- Replace the placeholder Unsplash thumbnails in `data/projects.js` with real project screenshots when ready.
