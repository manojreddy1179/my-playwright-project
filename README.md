# my-playwright-project

Playwright + TypeScript full-stack test framework.

## Setup

```powershell
npm install
npx playwright install
```

## Test folders

- `tests/e2e/` — UI end-to-end tests
- `tests/api/` — API tests
- `tests/db/` — Database tests
- `src/pageObjects/` — Page object models
- `src/api/` — API helper classes
- `src/db/` — DB helper classes

## Run tests

```powershell
npm test
npm run test:e2e
npm run test:api
npm run test:db
npm run test:allure
npm run test:headed
npm run test:debug
```

## Run specific tests

```powershell
npm run test:e2e -- --project=chrome
```

## Allure reporting

Single-step generation and opening:

```powershell
npm run test:allure
npm run test:e2e:allure
npm run test:api:allure
npm run test:db:allure
```

Each command runs the tests, generates `allure-report`, and opens it automatically.

Allure output is written to `allure-results` and screenshots are captured for failed steps.

Keeping Trends across runs
 - Allure computes Trends by comparing the current run with prior run history. To see Trends you must preserve `allure-report/history` between runs.

Local (manual) steps to preserve history:

```powershell
# Run tests and generate report (first run)
npm run test:e2e:allure

# On the next run, copy previous report history into results before generating
if (Test-Path 'allure-report\history') { Copy-Item -Path 'allure-report\history' -Destination 'allure-results\history' -Recurse -Force }
npm run test:e2e:allure
```

CI recommendation (GitHub Actions)
- We provide a sample workflow at `.github/workflows/allure-ci.yml` that attempts to restore the last successful run's `allure-report/history` artifact before running tests and uploads the updated history after the run. This lets Allure build Trends across CI runs.

Notes:
- Trends require at least two runs with preserved history to appear.
- Keep test names and suite structure stable so Allure can correlate cases.
- For long-term storage or multiple branches, consider uploading history artifacts to a stable storage (S3, Artifactory) and restoring from there.

S3-backed CI setup
 - The repository includes `.github/workflows/allure-ci-s3.yml` as an example that stores per-branch history at `s3://<BUCKET>/<branch>/allure-history.zip`.
 - Required GitHub secrets:
	 - `AWS_ACCESS_KEY_ID` — IAM key id with S3 PutObject/GetObject permissions
	 - `AWS_SECRET_ACCESS_KEY` — IAM secret
	 - `AWS_REGION` — AWS region for the bucket (e.g., `us-east-1`)
	 - `ALLURE_HISTORY_S3_BUCKET` — the S3 bucket name (no s3:// prefix)

Local helper scripts
 - There are cross-platform helpers in `scripts/`:
	 - `scripts/zip-allure-history.js` — zips `allure-report/history` to `allure-history.zip` (uses PowerShell on Windows, `zip` on Linux/Mac).
	 - `scripts/unzip-allure-history.js` — extracts `allure-history.zip` into `allure-results/history`.

NPM shortcuts
```powershell
npm run allure:zip-history
npm run allure:unzip-history
```

CI tips
 - Ensure your CI runner has `zip`/`unzip` installed, or use the PowerShell steps on Windows runners.
 - For GitHub Actions using the S3 workflow, set the secrets above and ensure the IAM user has access to the bucket.

<!-- Playwright HTML and custom Extent reporter removed. Allure is the chosen reporter. -->

## Cleanup guidance

Generated artifacts are not part of the source tree:

- `node_modules/` should be ignored by Git
- `test-results/` can be removed after test runs
- `.playwright/` is normally generated and ignored
- `allure-results/` and `allure-report/` should be ignored

## Files

- [package.json](package.json)
- [tsconfig.json](tsconfig.json)
- [playwright.config.ts](playwright.config.ts)
- [src/config.ts](src/config.ts)
- [src/pageObjects/LoginPage.ts](src/pageObjects/LoginPage.ts)
- [src/api/ApiClient.ts](src/api/ApiClient.ts)
- [src/db/DbClient.ts](src/db/DbClient.ts)
- [tests/e2e/login.spec.ts](tests/e2e/login.spec.ts)
- [tests/api/api.spec.ts](tests/api/api.spec.ts)
- [tests/db/db.spec.ts](tests/db/db.spec.ts)
 
