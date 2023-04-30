import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import client, { BUCKET_NAME } from "./client";
import logger from "logger";

// Show the photos that exist in an album.
export default async function getObject(key: string): Promise<string | null> {
  try {
    const input = {
      Bucket: BUCKET_NAME,
      Key: key,
    };

    const command = new GetObjectCommand(input);
    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

    return signedUrl;
  } catch (err: any) {
    logger.error("There was an error fetching object: " + err.message);
    return null;
  }
}
