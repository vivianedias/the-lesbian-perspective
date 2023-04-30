import { Heading } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

export default function Manifesto() {
  const { t } = useTranslation("common");
  return <Heading>{t("manifesto.title")}</Heading>;
}
