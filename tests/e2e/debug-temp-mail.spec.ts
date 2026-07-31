import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const outDir = path.join(__dirname, '..', 'artifacts');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

test('debug temporarymail: dump DOM before/after change click and list candidate domain texts', async ({ page }) => {
  await page.goto('https://temporarymail.com/en/', { waitUntil: 'load' });

  // save before click
  const beforeHtml = await page.content();
  fs.writeFileSync(path.join(outDir, 'before-change.html'), beforeHtml, 'utf8');
  console.log('Saved before-change.html');

  // click Change (best-effort)
  try {
    await page.click('button:has-text("Change")', { timeout: 5000 });
  } catch (e) {
    try { await page.click('text=Change', { timeout: 5000 }); } catch {}
  }

  // wait briefly for any modal to appear
  await page.waitForTimeout(2000);

  // save after click
  const afterHtml = await page.content();
  fs.writeFileSync(path.join(outDir, 'after-change.html'), afterHtml, 'utf8');
  console.log('Saved after-change.html');

  // Gather candidate domain texts from common containers
  const candidateSelectors = [
    'select option',
    'ul li',
    'div[role="dialog"] li',
    '.modal li',
    '.domains-list li',
    '.dropdown-menu li',
    '.domain-item',
    'button.domain-button',
    'a:has-text("@")',
  ];
  const texts: string[] = [];
  for (const sel of candidateSelectors) {
    try {
      const loc = page.locator(sel);
      const count = await loc.count();
      for (let i = 0; i < count; i++) {
        const txt = (await loc.nth(i).innerText()).trim();
        if (txt && txt.length < 200) texts.push(`${sel} -> ${txt}`);
      }
    } catch (e) {
      // ignore
    }
  }

  // Also try to find any text that looks like an @domain
  const bodyText = await page.evaluate(() => document.body.innerText || '');
  const domainMatches = Array.from(new Set((bodyText.match(/@[A-Za-z0-9.-]+/g) || [])));

  const out = {
    timestamp: new Date().toISOString(),
    candidates: texts.slice(0, 200),
    domainMatches,
  };
  fs.writeFileSync(path.join(outDir, 'domain-candidates.json'), JSON.stringify(out, null, 2), 'utf8');
  console.log('Wrote domain-candidates.json');
});
