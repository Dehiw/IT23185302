# IT23185302

Playwright Automated Testing Project
- This repository contains an automated testing project using Playwright. It includes all test scripts, configuration files, and instructions for running tests on Chromium.

Prerequisites
- Before running the tests, make sure you have the following installed:
    Node.js (check version with node -v)
    npm (check version with npm -v)

Setup Instructions
- Clone the repository
    `git clone <your-repository-link>`
    `cd <repository-folder>`

- Install Playwright and project dependencies
    `npm init playwright@latest`

- Run tests
  Run all tests using Chromium with a single worker:
    `npx playwright test --workers=1 --project=chromium`

  Alternative test commands
  If the above command does not work, you can run tests using:
    `npx playwright test`

- View HTML test reports
    `npx playwright show-report`