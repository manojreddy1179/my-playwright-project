# my-playwright-project

Playwright + TypeScript full-stack test framework.

## Setup

```powershell
npm install
npx playwright install
```

Run tests

```powershell
npm test
# or run headed
npm run test:headed
npm run test:debug
```

Run specific tests

```powershell
npx playwright test tests/login.spec.ts --project=chrome
```

Files

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
 
