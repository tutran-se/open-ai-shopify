import { Link, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <>
      <Text
        style={{ fontSize: "12px" }}
        color="gray.400"
        textAlign={"center"}
        py={4}
      >
        Build & Design by{" "}
        <Link
          textDecor="underline"
          href="https://github.com/tutran-se"
          target="_blank"
        >
          tutran
        </Link>
      </Text>
    </>
  );
};

export default Footer;
