import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { getObject } from "lib/s3";
import { Response } from "../types/airtable";

export default function Photos({ photos }: { photos: Response }) {
  const [imgs, setImgs] = useState<string[]>([]);

  const getImgs = useCallback(async () => {
    const fetchImgs = photos.map((photo) =>
      getObject(`${photo.author}/${photo.name}`)
    );
    const imgs = (await Promise.all(fetchImgs)).flat().filter(Boolean);

    setImgs(imgs as string[]);
  }, [photos]);

  useEffect(() => {
    getImgs();
  }, [getImgs]);

  return (
    <>
      {imgs.map((src) => {
        return <Image key={src} src={src} alt={""} width={100} height={100} />;
      })}
    </>
  );
}
