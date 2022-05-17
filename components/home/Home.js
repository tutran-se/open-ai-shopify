import { Button, Center, Heading, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { BsGoogle } from "react-icons/bs";
import { useAuth } from "../context/AuthContextProvider";
import Logo from "../logo/Logo";

const Home = () => {
  const { loginWithGoogle } = useAuth();
  return (
    <Center h="100vh" flexDirection="column">
      <Logo className="vibrate-1" />
      <Heading size="2xl" className="tracking-in-contract" fontWeight="900">
        Open AI
      </Heading>
      <Text mt="2"> - Shopify Challenge 2022 - </Text>
      <br />
      <br />

      <VStack spacing={3}>
        <Button colorScheme="teal" size="lg" onClick={loginWithGoogle}>
          <BsGoogle />
          &nbsp; Log in with Google
        </Button>
      </VStack>
      <br />
      <Text style={{ fontSize: "12px" }} color="gray.400">
        Build & Design by{" "}
        <Link
          textDecor="underline"
          href="https://github.com/tutran-se"
          target="_blank"
        >
          tutran
        </Link>
      </Text>
    </Center>
  );
};

export default Home;
