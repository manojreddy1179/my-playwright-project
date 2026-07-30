const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const { promisify } = require('util');
const pipeline = promisify(stream.pipeline);

async function download(client, bucket, key, outPath) {
  const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
  const res = await client.send(cmd);
  await pipeline(res.Body, fs.createWriteStream(outPath));
}

async function upload(client, bucket, key, filePath) {
  const body = fs.createReadStream(filePath);
  const cmd = new PutObjectCommand({ Bucket: bucket, Key: key, Body: body });
  await client.send(cmd);
}

async function main() {
  const action = process.argv[2]; // download|upload
  const bucket = process.env.ALLURE_HISTORY_S3_BUCKET;
  const branch = process.env.GITHUB_REF ? process.env.GITHUB_REF.replace('refs/heads/', '') : (process.env.BRANCH || 'main');
  if (!bucket) {
    console.error('ALLURE_HISTORY_S3_BUCKET env var is required');
    process.exit(2);
  }
  const key = `${branch}/allure-history.zip`;

  const client = new S3Client({ region: process.env.AWS_REGION });

  if (action === 'download') {
    const out = path.join(process.cwd(), 'allure-history.zip');
    try {
      await download(client, bucket, key, out);
      console.log('Downloaded', out);
    } catch (err) {
      console.log('No previous history found or download failed:', err.name || err.message || err);
      process.exit(0);
    }
  } else if (action === 'upload') {
    const file = path.join(process.cwd(), 'allure-history.zip');
    if (!fs.existsSync(file)) {
      console.log('No archive to upload at', file);
      process.exit(0);
    }
    try {
      await upload(client, bucket, key, file);
      console.log('Uploaded', key, 'to', bucket);
    } catch (err) {
      console.error('Upload failed:', err.name || err.message || err);
      process.exit(1);
    }
  } else {
    console.error('Usage: node s3-allure-sync.js download|upload');
    process.exit(2);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
