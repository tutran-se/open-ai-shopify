import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Heading,
  Link,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import PromptForm from "./PromptForm";
import ResultList from "./ResultList";
import Image from "next/image";
import robotSrc from "../../public/assets/robot.png";
const Feeds = () => {
  const [isOpenAlert, setIsOpenAlert] = useState(true);
  const [isSmallerThan414px] = useMediaQuery("(max-width: 414px)");

  return (
    <Box p={4} py={8}>
      {isOpenAlert && (
        <>
          <Alert status="info" display={isSmallerThan414px ? "block" : "flex"}>
            <AlertIcon mb={["2", "1", "0"]} />
            <Text fontSize={["12px", "15px"]} fontStyle="italic">
              &quot;To experience real-time updates, please open 2 browser tabs
              or log in with 2 accounts simultaneously. Hope you like it.&quot;
              -&nbsp;
              <Link
                textDecor="underline"
                href="https://github.com/tutran-se"
                target="_blank"
              >
                tutran
              </Link>
              🙋‍♂️
            </Text>
            <Box
              onClick={() => setIsOpenAlert(false)}
              textAlign={isSmallerThan414px && "center"}
            >
              <Button
                colorScheme="blue"
                size="sm"
                mt={["2", "1", "0"]}
                display={isSmallerThan414px ? "inline-block" : "inline-flex"}
              >
                Got it
              </Button>
            </Box>
          </Alert>
          <br />
          <br />
        </>
      )}
      <Box position={"relative"} mt={14}>
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
          prompt me something?
        </Heading>
        <Box
          position={"absolute"}
          overflow="hidden"
          width={["125px", "140px", "175px", "175px"]}
          height={["125px", "140px", "175px", "175px"]}
          borderRadius={"100%"}
          top="-121px"
          left="94px"
        >
          <Image src={robotSrc} alt="avatar" objectFit="cover" layout="fill" />
        </Box>
      </Box>

      <br />
      <PromptForm />
      <ResultList />
    </Box>
  );
};

export default Feeds;
