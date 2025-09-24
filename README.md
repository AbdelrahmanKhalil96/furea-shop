# Furea Shop CI/CD with Jenkins & Netlify

This project demonstrates a CI/CD pipeline for the **Furea Shop** Angular application.  
The pipeline is fully automated with **build, test, and deploy stages**, ensuring quality before release.

## Pipeline Overview

<img width="661" height="249" alt="image" src="https://github.com/user-attachments/assets/2b29243f-d947-4189-8d76-cfd554492c7f" />

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

The app will be available at:
👉 http://localhost:3000

# Run tests
npx playwright test --reporter=html
