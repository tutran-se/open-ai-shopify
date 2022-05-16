import {
  Box,
  Button,
  Center,
  SkeletonCircle,
  SkeletonText,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ResultItem from "./ResultItem";
import styled from "styled-components";
import { useGetResultLists } from "../../libs/feeds";

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
  let [pageSize, setPageSize] = useState(5);
  const { total, data, isLoading, isLoading2 } = useGetResultLists({
    pageSize,
  });

  return (
    <Box mt={"16"}>
      <CustomStack colormode={colorMode}>
        {isLoading ? (
          <>
            {Array(5)
              .fill("")
              .map((_, index) => {
                return (
                  <Box
                    key={index}
                    border={"1px"}
                    borderColor="gray.600"
                    rounded="md"
                    boxShadow="lg"
                    position={"relative"}
                  >
                    <Box p={4}>
                      <SkeletonCircle size="10" />
                      <SkeletonText mt="4" noOfLines={4} spacing="4" />
                    </Box>
                  </Box>
                );
              })}
          </>
        ) : (
          <>
            {data.length > 0 &&
              data.map((item) => <ResultItem key={item.id} item={item} />)}
          </>
        )}
        {isLoading2 && (
          <>
            {Array(5)
              .fill("")
              .map((_, index) => {
                return (
                  <Box
                    key={index}
                    border={"1px"}
                    borderColor="gray.600"
                    rounded="md"
                    boxShadow="lg"
                    position={"relative"}
                  >
                    <Box p={4}>
                      <SkeletonCircle size="10" />
                      <SkeletonText mt="4" noOfLines={4} spacing="4" />
                    </Box>
                  </Box>
                );
              })}
          </>
        )}
      </CustomStack>

      {total >= pageSize ? (
        <Center mt={4}>
          <Button
            colorScheme={"orange"}
            onClick={() => setPageSize(pageSize + 5)}
          >
            👋 Load More
          </Button>
        </Center>
      ) : (
        <>{total > 5 && <Center mt={4}>🤷 Ooops, That&apos;s all.</Center>}</>
      )}
    </Box>
  );
};

export default ResultList;
