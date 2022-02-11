import "@fontsource/raleway/400.css";
import "@fontsource/raleway/700.css";
import "@fontsource/merriweather/400.css";
import "@fontsource/merriweather/700.css";
import "@fontsource/alice/400.css";

import { ChakraProvider } from "@chakra-ui/react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import theme from "../theme";
import { AppProps } from "next/app";
import { AuthProvider } from "../util/useAuth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.GOOGLE_RECAPTCHA_API_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <AuthProvider>
        <ChakraProvider resetCSS theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
