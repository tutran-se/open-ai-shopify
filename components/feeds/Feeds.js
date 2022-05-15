import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import PromptForm from "./PromptForm";
import ResultList from "./ResultList";

const Feeds = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(true);
  return (
    <Box p={4} py={8}>
      {isOpenAlert && (
        <>
          <Alert status="info">
            <AlertIcon />
            <Text>
              &quot;To experience real-time updates, please open 2 browser tabs
              or login with 2 accounts simultaneously. Hope you like it&quot;. -{" "}
              <Link
                textDecor="underline"
                href="https://github.com/tutran-se"
                target="_blank"
              >
                tutran
              </Link>
              🙋‍♂️
            </Text>
            <Box onClick={() => setIsOpenAlert(false)}>
              <Button colorScheme="blue">Got it</Button>
            </Box>
          </Alert>
          <br />
          <br />
        </>
      )}

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
