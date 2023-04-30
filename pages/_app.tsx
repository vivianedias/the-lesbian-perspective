import "@fontsource/ramaraja";
import "@fontsource/quicksand";
import "@fontsource/reem-kufi";

import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme, VStack } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import { appWithTranslation } from "next-i18next";
import { Analytics } from "@vercel/analytics/react";

import customTheme from "shared/theme";
import { Header, Footer } from "shared/components";
import { fetcher, IS_IN_MAINTENANCE } from "shared/utils";

const theme = extendTheme(customTheme);

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <SWRConfig value={{ fetcher }}>
          <Header />
          <VStack
            maxWidth="100vw"
            minHeight="calc(100vh - 120px)"
            justifyContent="center"
            alignItems="center"
            as="main"
            py={IS_IN_MAINTENANCE ? 0 : [8, 16]}
          >
            <Component {...pageProps} />
            <Analytics />
          </VStack>
          <Footer />
        </SWRConfig>
      </ChakraProvider>
    </>
  );
}

export default appWithTranslation(App);
