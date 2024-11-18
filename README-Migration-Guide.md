# Migration Guide

To make the app user friendly on a mixed VPS / Dedicated Server (mixed as in it can support php, nodejs, AND python) which helps reduce costs... certain considerations are made

While some of my other apps are served across an express port. We don't serve the React app across an express port, nor do we serve on a React hot reload preview port, therefore we do not need reverse proxy to maintain a friendly url to users. It'll just be the static files at build/. But because we've standardized all React apps to be running from /app/ path and React insists to fallback on the root path for static files (domain.tld/ instead of domain.tld/app/), there are steps to take when migrating to different folder or server or dev-vs-production environments.

Base URL - Here's how you replace the baseURL for this app:
- Run grep for `/app/workout-player/` and replace with your new baseURL. Or you may use sed to match and replace.
  - public/manifest.json's `"start_url": "/app/workout-player/"` which if installed as PWA then that's the launching url.
- ? Run grep for `/app/workout-player` and replace with your new baseURL. Or you may use sed to match and replace.
  - Not applicable here.
- Run grep for `/app/workout-player/build` and replace with your new baseURL. Or you may use sed to match and replace.
  - src/App.js's `<Router basename="/app/workout-player/build">` which makes sure all clicked links do not reset to a root folder (which React Router assumes because traditionally React apps are run at root at some port like 3001)
  - package.json's `"homepage": "/app/workout-player/build",` which makes sure when you run `npm run build` that the build's webpage will serve static files from this fodler rather than the traditionally assumed domain root.

Vhost: 
- Redirect `/app/workout-player[/]*` to its `build/` folder

Eg.
```
  # Redirect to build folder
  location ~ /app/workout-player[/]*$ {
      return 301 /app/workout-player/build;
  }
```

Starting:
- Make sure you've re-built the render and cra React build by running `npm run build` first. 
- Visit directly the build folder, eg. https://wengindustry.com/app/workout-player/build
  - Or visit the app folder (https://wengindustry.com/app/workout-player/) and it'll redirect you to its build/ child folder.