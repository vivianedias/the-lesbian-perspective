import { ListObjectsCommand } from "@aws-sdk/client-s3";
import client from "./client";
import logger from "logger";

// List the photo albums that exist in the bucket.
export default async function listAlbums() {
  try {
    const input = {
      // ListObjectsRequest
      Bucket: "the-lesbian-perspective", // required
      Delimiter: "/",
    };
    const command = new ListObjectsCommand(input);
    const response = await client.send(command);
    const commonPrefixes = response.CommonPrefixes || [];

    if (commonPrefixes.length < 1) return [];

    const albums = commonPrefixes.map((commonPrefix) => {
      const prefix = commonPrefix.Prefix || "";
      const albumName = decodeURIComponent(prefix.replace("/", ""));
      return albumName;
    });

    return albums;
  } catch (err: any) {
    logger.error("There was an error listing your albums: " + err.message);
    return [];
  }
}
