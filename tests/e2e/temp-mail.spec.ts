import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const emailsFile = path.join(__dirname, 'data', 'emails.json');

// Helpful util: safely try a click using multiple selector options
async function tryClick(page: any, selectors: string[] | string) {
  const opts = Array.isArray(selectors) ? selectors : [selectors];
  for (const s of opts) {
    try {
      await page.click(s, { timeout: 4000 });
      return true;
    } catch (e) {
      // try next
    }
  }
  return false;
}

test('temporarymail: change to random name, set domain, copy and save email', async ({ page }) => {
  await page.goto('https://temporarymail.com/en/', { waitUntil: 'load' });

  // 1) Click "Change" to open the change-address dialog (try several common selectors)
  await tryClick(page, ['text=Change', 'text=change', 'button:has-text("Change")', 'a:has-text("Change")']);

  // 2) In dialog click on "Random name" (or similar). Try plural selectors.
  await tryClick(page, ['text=Random name', 'text=Random Name', 'text=Random', 'button:has-text("Random")']);

  // 3) Change the domain to allwebEmails.com
  // Try select element first, then fallback to clicking domain options or filling an input
  let domainSet = false;
  try {
    const select = page.locator('select');
    if (await select.count() > 0) {
      // Try selecting by label/value
      try {
        await select.first().selectOption({ label: 'allwebEmails.com' });
        domainSet = true;
      } catch (e) {
        // try value
        try {
          await select.first().selectOption({ value: 'allwebEmails.com' });
          domainSet = true;
        } catch (err) {
          // ignore
        }
      }
    }
  } catch (e) {
    // ignore
  }

  if (!domainSet) {
    // Try clicking a domain link or item
    const clicked = await tryClick(page, [
      'text=allwebEmails.com',
      'text=allwebEmails',
      'li:has-text("allwebEmails.com")',
      "//*[contains(text(), 'allwebEmails.com')]",
    ]);
    if (clicked) domainSet = true;
  }

  // 4) Click "Change address" / "Change Address" / "Change" to apply
  await tryClick(page, ['text=Change address', 'text=Change Address', 'text=Change', 'button:has-text("Change address")']);

  // Wait a short while for UI update
  await page.waitForTimeout(1500);

  // 5) Extract an email address from the page body that ends with our domain
  const bodyText: string = await page.evaluate(() => document.body.innerText || '');
  const emailRegex = /[\w.+-]+@allwebEmails\.com/i;
  const match = bodyText.match(emailRegex);
  expect(match, 'expected to find a generated email with domain allwebEmails.com').not.toBeNull();
  const email = match![0].trim();

  // Print to console
  console.log('Generated temporary email:', email);

  // 6) Click "Save" or "Save & Copy" or similar to copy/mail address link (best-effort)
  await tryClick(page, [
    'text=Save and copy',
    'text=Save & Copy',
    'text=Save and copy address',
    'text=Save',
    'button:has-text("Save")',
  ]);

  // 7) Append the found email into tests/e2e/data/emails.json with timestamp (do not override existing entries)
  try {
    let list: any[] = [];
    if (fs.existsSync(emailsFile)) {
      const txt = fs.readFileSync(emailsFile, 'utf8').trim();
      if (txt) {
        try {
          list = JSON.parse(txt);
          if (!Array.isArray(list)) list = [];
        } catch (e) {
          // corrupted/invalid file: back it up and start new array
          const backup = emailsFile + '.bak.' + Date.now();
          fs.copyFileSync(emailsFile, backup);
          console.warn('Backed up invalid emails.json to', backup);
          list = [];
        }
      }
    }
    list.push({ email, createdAt: new Date().toISOString() });
    fs.writeFileSync(emailsFile, JSON.stringify(list, null, 2), 'utf8');
    console.log('Appended email to', emailsFile);
  } catch (err) {
    console.error('Failed to write email to file', err);
    throw err;
  }

});
