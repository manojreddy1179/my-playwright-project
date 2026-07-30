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
- `src/db/` — Database helper classes

## Run tests

```powershell
npm test
npm run test:e2e
npm run test:api
npm run test:db
npm run test:headed
npm run test:debug
```

## Example commands

```powershell
npm run test:e2e -- --project=chrome
npm run test:api
npm run test:db
```

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
 
