import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../logo/Logo";

const PageLoader = () => {
  return (
    <Center minH={"100vh"}>
      <Box>
        <Logo className="vibrate-1" margin={"0 auto"} />
        <br />
        <Text>Loading...</Text>
      </Box>
    </Center>
  );
};

export default PageLoader;
