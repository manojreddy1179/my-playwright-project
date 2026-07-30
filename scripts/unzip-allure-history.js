const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const root = process.cwd();
const zipFile = path.join(root, 'allure-history.zip');
const outDir = path.join(root, 'allure-results', 'history');

try {
  if (!fs.existsSync(zipFile)) {
    console.log('No allure-history.zip found; nothing to extract.');
    process.exit(0);
  }

  if (!fs.existsSync(path.dirname(outDir))) fs.mkdirSync(path.dirname(outDir), { recursive: true });
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  if (process.platform === 'win32') {
    const psCmd = `Expand-Archive -Path '${zipFile}' -DestinationPath '${outDir}' -Force`;
    execSync(`powershell -Command "${psCmd}"`, { stdio: 'inherit' });
  } else {
    try {
      execSync('unzip -v', { stdio: 'ignore' });
    } catch (e) {
      console.error('`unzip` not found on PATH. Install unzip or run on Windows PowerShell.');
      process.exit(1);
    }
    execSync(`unzip -o '${zipFile}' -d '${outDir}'`, { stdio: 'inherit' });
  }

  console.log('Extracted history to', outDir);
  process.exit(0);
} catch (err) {
  console.error('Error extracting archive:', err.message || err);
  process.exit(2);
}
