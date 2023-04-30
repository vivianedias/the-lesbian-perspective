import { useCallback, useEffect, useState } from "react";

import { getObject } from "lib/s3";
import { Response } from "../types/airtable";

export default function Photos({
  fileNames,
  children,
}: {
  fileNames: Response;
  children(options: { photoUrls: string[] }): JSX.Element;
}) {
  const [urls, setUrls] = useState<string[]>([]);

  const getImgs = useCallback(async () => {
    const fetchPhotoUrls = fileNames.map((photo) =>
      getObject(`${photo.author}/${photo.name}`)
    );
    const imgs = (await Promise.all(fetchPhotoUrls)).flat().filter(Boolean);

    setUrls(imgs as string[]);
  }, [fileNames]);

  useEffect(() => {
    getImgs();
  }, [getImgs]);

  return children({
    photoUrls: urls,
  });
}
