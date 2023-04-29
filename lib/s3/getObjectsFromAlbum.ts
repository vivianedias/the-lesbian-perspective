import { ListObjectsCommand } from "@aws-sdk/client-s3";
import client, { BUCKET_NAME, BUCKET_URL } from "./client";
import logger from "logger";

// Show the photos that exist in an album.
export default async function getObjectsFromAlbum(albumName: string) {
  try {
    const albumPhotosKey = encodeURIComponent(albumName) + "/";
    const input = {
      // ListObjectsRequest
      Bucket: BUCKET_NAME, // required
      Prefix: albumPhotosKey,
    };

    const command = new ListObjectsCommand(input);
    const response = await client.send(command);

    const bucketUrl = BUCKET_URL + "/" + albumName;

    const content = response.Contents || [];
    console.log({ content });
    if (content.length < 1) return [];

    const photos = content
      .filter((photo) => photo.Key !== albumPhotosKey) // removes album folder
      .map((photo) => {
        const photoKey = photo.Key || "";
        const photoUrl = bucketUrl + encodeURIComponent(photoKey);
        return photoUrl;
      });

    return photos;
  } catch (err: any) {
    logger.error("There was an error viewing your album: " + err.message);
    return [];
  }
}
