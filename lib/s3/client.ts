import { S3Client } from "@aws-sdk/client-s3";

const accessKey = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
const secretKey = process.env.NEXT_PUBLIC_AWS_SECRET_KEY;
const region = process.env.NEXT_PUBLIC_AWS_REGION;
export const BUCKET_URL = process.env.NEXT_PUBLIC_AWS_BUCKET_URL;

if (!accessKey || !secretKey || !region || !BUCKET_URL) {
  throw new Error(
    "Please provide the AWS credentials and configs env variables."
  );
}

export const BUCKET_NAME = "the-lesbian-perspective";

const client = new S3Client({
  region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
});

export default client;
