import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import PromptForm from "./PromptForm";

const Feeds = () => {
  return (
    <Box mt={5} p={4} py={8}>
      <Heading fontWeight={900} textAlign="center">
        Hey, Ask me anything !
      </Heading>
      <br />
      <PromptForm />
    </Box>
  );
};

export default Feeds;
