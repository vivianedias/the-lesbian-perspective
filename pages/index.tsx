import { GetServerSideProps } from "next";
import { Box, Text } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import useSWRImmutable from "swr/immutable";

import { Head, Photos } from "@/shared/components";
import { Response } from "@/shared/types/airtable";

export default function Home() {
  const { t } = useTranslation("common");
  const {
    data: photos,
    isLoading,
    error,
  } = useSWRImmutable<Response, string>("/api/airtable");

  if (isLoading) return <Text>Carregando...</Text>;

  if (error) return <Text>There was an error while fetching the data</Text>;

  return (
    <>
      <Head title={t("title")} description={t("description")} />
      <Box>{t("content")}</Box>
      {photos ? <Photos photos={photos} /> : null}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    return {
      props: {
        locale: ctx.locale,
        ...(await serverSideTranslations(ctx.locale || "pt-BR", [
          "common",
          "header",
          "footer",
        ])),
      },
    };
  } catch (e) {
    return {
      props: {
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
