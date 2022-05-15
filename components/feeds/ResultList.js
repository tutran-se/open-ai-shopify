import { Box, useColorMode, VStack } from "@chakra-ui/react";
import React from "react";
import ResultItem from "./ResultItem";
import styled from "styled-components";
const CustomStack = styled(VStack)`
  position: relative;
  & {
    align-items: stretch;
  }
  & > div:nth-child(odd) {
    align-self: flex-start;

    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: ${({ colormode }) =>
        colormode === "dark" ? "#97e3ec" : "#c4c4c4"};
      border-radius: 100%;
      top: 50%;
      left: calc(100% + 3.23 * 100% / 47);
      transform: translateY(-50%) translateX(-50%);
    }
  }
  & > div:nth-child(even) {
    align-self: flex-end;

    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: ${({ colormode }) =>
        colormode === "dark" ? "#97e3ec" : "#c4c4c4"};

      border-radius: 100%;
      top: 50%;
      left: calc(-3.23 * 100% / 47);
      transform: translateY(-50%) translateX(calc(-50%));
    }
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 2px;
    background-color: ${({ colormode }) =>
      colormode === "dark" ? "#696767" : "#c4c4c4"};
    height: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  & > div {
    /* border-color: #97e3ec; */
    border-color: ${({ colormode }) => colormode === "light" && "#97e3ec"};
    max-width: 47%;
    width: 100%;
  }
  @media (max-width: 414px) {
    &::before {
      display: none;
    }

    & > div:nth-child(odd) {
      &::before {
        display: none;
      }
      max-width: 100%;
      align-self: stretch;
    }
    & > div:nth-child(even) {
      &::before {
        display: none;
      }
      max-width: 100%;
      align-self: stretch;
    }
  }
`;

const ResultList = () => {
  const { colorMode } = useColorMode();
  return (
    <Box mt={"16"}>
      <CustomStack colormode={colorMode}>
        <ResultItem />
        <ResultItem />
        <ResultItem />
        <ResultItem />
      </CustomStack>
    </Box>
  );
};

export default ResultList;