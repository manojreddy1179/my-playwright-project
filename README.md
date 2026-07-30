# my-playwright-project

Quick Playwright + TypeScript starter.

Setup

```powershell
npm init -y
npm install -D @playwright/test typescript ts-node
npx playwright install
```

Run tests

```powershell
npm test
# or run headed
npm run test:headed
```

Run specific tests

```powershell
npx playwright test tests/login.spec.ts --project=chrome
```

Files

- [package.json](package.json)
- [tsconfig.json](tsconfig.json)
- [playwright.config.ts](playwright.config.ts)
- [tests/login.spec.ts](tests/login.spec.ts)
 
