import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import PromptForm from "./PromptForm";
import ResultList from "./ResultList";

const Feeds = () => {
  return (
    <Box mt={5} p={4} py={8}>
      <Text fontSize={15} textAlign="center">
        Open AI - Shopify Challenge 2022
      </Text>
      <Heading
        fontWeight={900}
        textAlign="center"
        bgGradient="linear(to-r, #4da9ec, #ee3994)"
        bgClip="text"
        fontSize={["4xl", "4xl"]}
      >
        prompt me something.
      </Heading>

      <br />
      <PromptForm />
      <ResultList />
    </Box>
  );
};

export default Feeds;
