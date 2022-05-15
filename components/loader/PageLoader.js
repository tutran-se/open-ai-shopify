import { Box, Center, Heading, Text } from "@chakra-ui/react";
import React from "react";

const PageLoader = () => {
  return (
    <Center minH={"100vh"}>
      <Box>
        <Heading className="vibrate-1" size={"xl"} textAlign="center">
          🚀
        </Heading>
        <br />
        <Text>Loading...</Text>
      </Box>
    </Center>
  );
};

export default PageLoader;
