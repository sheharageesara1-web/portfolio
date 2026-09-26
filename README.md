# A.E.S.C. Geesara — Portfolio

A React + Vite personal portfolio site (dark/light mode, scroll-reveal animations, animated terminal hero).

## 1. Run it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Replace `<your-username>` and `<repo-name>` with your actual GitHub username and the repository name you create on GitHub.com.

## 3. Publish on GitHub Pages (automatic, recommended)

This repo already includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys the site automatically every time you push to `main`.

Steps:
1. Push the code to GitHub (step 2 above).
2. On GitHub, go to your repo → **Settings** → **Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push again (or re-run the workflow from the **Actions** tab). After it finishes, your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

## 4. Publish on GitHub Pages (manual alternative)

If you prefer not to use Actions, you can deploy with the `gh-pages` package (already in `devDependencies`):

```bash
npm run deploy
```

Then in GitHub repo **Settings → Pages**, set **Source** to the `gh-pages` branch.

## Customize

Open `src/App.jsx` and edit the `PROFILE`, `SKILLS`, `PROJECTS`, and `EDUCATION` objects near the top of the file with your own details, photo, CV link, and project links.

## Tech stack

- React 18
- Vite 5
- lucide-react (icons)
