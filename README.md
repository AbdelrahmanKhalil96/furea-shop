# Furea Shop CI/CD with Jenkins & Netlify

This project demonstrates a CI/CD pipeline for the **Furea Shop** Angular application.  
The pipeline is fully automated with **build, test, and deploy stages**, ensuring quality before release.

## Pipeline Overview

1. **Build**
   - Runs inside a Node.js Docker container.
   - Installs dependencies with `npm ci`.
   - Builds Angular app into `dist/furea-shop`.

2. **Test**
   - Uses Microsoft Playwright Docker image.
   - Runs end-to-end (E2E) Playwright tests.
   - Generates HTML test reports in Jenkins.
   - ❌ If tests fail, the pipeline stops (no deployment).

3. **Deploy**
   - Uses Netlify CLI inside Docker.
   - Deploys `dist/furea-shop` to Netlify production.
   - Requires Jenkins credentials for `NETLIFY_AUTH_TOKEN`.

## How to Run Locally

```bash
# Clone repo
git clone https://github.com/AbdelrahmanKhalil96/furea-shop.git
cd furea-shop

# Install dependencies
npm install

# Run development server
npm start

# Run tests
npx playwright test --reporter=html
CI/CD Architecture
The pipeline runs as follows:

GitHub → Jenkins (Build → Test → Deploy) → Netlify → Live App

yaml
Copy code
