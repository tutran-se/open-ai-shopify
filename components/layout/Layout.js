import { Box } from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box minH={"80vh"}>{children}</Box>
      <Footer />
    </>
  );
};

export default Layout;
