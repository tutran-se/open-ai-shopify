import "../styles/globals.css";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import AuthContextProvider from "../components/context/AuthContextProvider";

const theme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
    mono: "Inter, sans-serif",
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Container maxW="container.sm">
          <Component {...pageProps} />
        </Container>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
