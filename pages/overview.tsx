import { GetServerSideProps } from "next";
import { Box, Heading, Text } from "@chakra-ui/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import useSWRImmutable from "swr/immutable";

import { Head, Overview } from "@/shared/components";
import { Photos } from "@/shared/hoc";
import { Response } from "@/shared/types/airtable";

export default function OverviewPage() {
  const { t } = useTranslation("overview");
  const {
    data: fileNames,
    isLoading,
    error,
  } = useSWRImmutable<Response, string>("/api/airtable");

  if (isLoading) return <Text>Carregando...</Text>;

  if (error) return <Text>There was an error while fetching the data</Text>;

  return (
    <>
      <Head title={t("title")} description={t("description")} />
      <Heading as={"h1"}>{t("title")}</Heading>
      <Heading
        as={"h3"}
        size={"md"}
        textTransform={"uppercase"}
        letterSpacing={"tight"}
        lineHeight={"shorter"}
      >
        {t("description")}
      </Heading>
      {fileNames ? (
        <Photos fileNames={fileNames}>
          {({ photoUrls }) => <Overview photoUrls={photoUrls} />}
        </Photos>
      ) : null}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    return {
      props: {
        locale: ctx.locale,
        ...(await serverSideTranslations(ctx.locale || "pt-BR", [
          "header",
          "footer",
          "overview",
        ])),
      },
    };
  } catch (e) {
    return {
      props: {
        locale: ctx.locale,
        ...(await serverSideTranslations(ctx.locale || "pt-BR", [
          "header",
          "footer",
          "overview",
        ])),
      },
    };
  }
};
