import { Button, Center, Heading, Link, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import styled from "styled-components";
import logoSrc from "../../public/assets/logo-small.png";
import { BsGoogle, BsGithub } from "react-icons/bs";
const Logo = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;
const Home = () => {
  return (
    <Center h="100vh" color="white" flexDirection="column">
      <Logo className="vibrate-1">
        <Image
          src={logoSrc}
          alt="Open AI - Shopify"
          layout="fill"
          objectFit="cover"
        />
      </Logo>
      <Heading size="3xl" className="tracking-in-contract">
        Open AI
      </Heading>
      <Text mt="2"> - Shopify Challenge 2022 - </Text>
      <br />
      <br />

      <VStack spacing={3}>
        <Button colorScheme="teal" size="lg">
          <BsGoogle />
          &nbsp; Login with Google
        </Button>
        <Button colorScheme="teal" size="lg">
          <BsGithub /> &nbsp;Login with GitHub
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
