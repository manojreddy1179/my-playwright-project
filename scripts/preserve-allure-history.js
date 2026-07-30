const fs = require('fs');
const path = require('path');

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return false;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
  return true;
}

try {
  const root = process.cwd();
  const reportHistory = path.join(root, 'allure-report', 'history');
  const resultsHistory = path.join(root, 'allure-results', 'history');

  if (fs.existsSync(reportHistory)) {
    console.log(`Copying existing Allure history from ${reportHistory} -> ${resultsHistory}`);
    copyDirSync(reportHistory, resultsHistory);
    console.log('Allure history preserved.');
  } else {
    console.log('No previous allure-report/history found; skipping history copy.');
  }
  process.exit(0);
} catch (err) {
  console.error('Error preserving allure history:', err);
  process.exit(1);
}
