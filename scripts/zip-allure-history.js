const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const root = process.cwd();
const historyDir = path.join(root, 'allure-report', 'history');
const outZip = path.join(root, 'allure-history.zip');

try {
  if (!fs.existsSync(historyDir)) {
    console.log('No allure-report/history directory found; nothing to zip.');
    process.exit(0);
  }

  if (process.platform === 'win32') {
    // Use PowerShell Compress-Archive
    const psCmd = `Compress-Archive -Path '${historyDir}\\*' -DestinationPath '${outZip}' -Force`;
    execSync(`powershell -Command "${psCmd}"`, { stdio: 'inherit' });
  } else {
    // Use zip on Unix-like systems
    // Ensure zip is installed
    try {
      execSync('zip -v', { stdio: 'ignore' });
    } catch (e) {
      console.error('`zip` not found on PATH. Install zip or run on Windows PowerShell.');
      process.exit(1);
    }
    const cwd = path.join(root, 'allure-report');
    execSync(`zip -r '${outZip}' history`, { cwd, stdio: 'inherit' });
  }

  console.log('Created', outZip);
  process.exit(0);
} catch (err) {
  console.error('Error creating archive:', err.message || err);
  process.exit(2);
}
