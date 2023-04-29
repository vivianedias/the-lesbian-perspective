import { useCallback, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import log from "logger";
import { fetcher } from "shared/utils";
import { Head } from "shared/components";
import { getObjectsFromAlbum, listAlbums } from "lib/s3";

export default function Home({
  data,
  error,
}: {
  error: boolean;
  data: { name: string };
}) {
  const { t } = useTranslation("common");
  const [imgs, setImgs] = useState<string[]>([]);

  const getImgs = useCallback(async () => {
    const albums = await listAlbums();
    const imgs = await Promise.all(
      albums.map((album) => getObjectsFromAlbum(album))
    );
    setImgs(imgs.flat());
  }, []);

  useEffect(() => {
    getImgs();
  }, []);

  return (
    <>
      <Head title={t("title")} description={t("description")} />
      <Box>
        {t("content")} - {data.name}
      </Box>
      {imgs.map((src) => (
        <Image key={1} src={src} alt={""} width={100} height={100} />
      ))}
      {error ? <p>There was an error while fetching the data</p> : null}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const data = await fetcher("/api/hello");
    log.info("All good with the main page req");
    return {
      props: {
        data,
        locale: ctx.locale,
        ...(await serverSideTranslations(ctx.locale || "pt-BR", [
          "common",
          "header",
          "footer",
        ])),
      },
    };
  } catch (e) {
    log.error(e, "Something went wrong with the main page req");
    return {
      props: {
        data: null,
        error: true,
        locale: ctx.locale,
        ...(await serverSideTranslations(ctx.locale || "pt-BR", [
          "common",
          "header",
          "footer",
        ])),
      },
    };
  }
};
