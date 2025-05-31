/* eslint-disable no-console */
/**
 * Helper script to upload cypress screenshots to S3.
 */

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { readFileSync, readdirSync, statSync } from "fs";

import { fileURLToPath } from "url";
import { join } from "path";

const getS3Client = () => {
  if (
    !process.env?.AWS_REGION ||
    !process.env?.AWS_S3_USER_ACCESS_KEY_ID ||
    !process.env?.AWS_S3_USER_SECRET_ACCESS_KEY ||
    !process.env?.AWS_S3_BUCKET_NAME
  ) {
    throw new Error("AWS environment variables are required.");
  }

  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_S3_USER_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_USER_SECRET_ACCESS_KEY,
    },
  });
};

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = join(dirPath, file);
    if (statSync(filePath).isDirectory()) {
      getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

async function uploadScreenshots() {
  const s3 = getS3Client();

  const bucket = process.env.AWS_S3_BUCKET_NAME;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = join(__filename, "..");

  console.log("Uploading screenshots to S3...");
  const screenshotsDir = join(__dirname, "..", "cypress", "screenshots");

  console.log("Local screenshots directory:", screenshotsDir);

  const files = getAllFiles(screenshotsDir).map((filePath) =>
    filePath.replace(`${screenshotsDir}/`, ""),
  );
  console.log("Screenshot files list:", files);

  const s3dir = "cypress/screenshots/" + new Date().toISOString();
  console.log("S3 bucket:", bucket);
  console.log("S3 directory:", s3dir);

  const uploadPromises = files.map(async (file) => {
    const filePath = join(screenshotsDir, file);
    const data = readFileSync(filePath);

    console.log("Uploading file:", file);
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: `${s3dir}/${file}`,
          Body: data,
          ContentType: "image/png",
        }),
      );
      console.log("Done uploading:", file);
    } catch (error) {
      console.error("Error uploading file:", file, error);
    }
  });

  await Promise.all(uploadPromises);
  console.log("All uploads completed.");
}

uploadScreenshots();
