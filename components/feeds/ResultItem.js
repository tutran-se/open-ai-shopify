import {
  Avatar,
  Box,
  HStack,
  SkeletonCircle,
  SkeletonText,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Tooltip } from "@chakra-ui/react";

const CustomBox = styled(Box)`
  position: relative;
  & span.ending {
    color: #a2a2a2;
    font-size: 12px;
  }
`;
const ResultItem = () => {
  return (
    <CustomBox
      border={"1px"}
      borderColor="gray.600"
      rounded="md"
      boxShadow="lg"
    >
      <Box bg={"whiteAlpha.200"} p={2}>
        <HStack>
          <Tooltip label="Dan Abrahmov">
            <WrapItem>
              <Avatar
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
                size={"sm"}
              />
            </WrapItem>
          </Tooltip>

          <Box>
            <Text fontSize={14}>How does AI work?</Text>
            <Text fontSize={12} color="gray.400">
              2 days ago (June 06, 2022)
            </Text>
          </Box>
        </HStack>
      </Box>
      <Text padding={4} fontSize={14} fontStyle="italic">
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
        inventore aspernatur laborum at non dolorum." -{" "}
        <span className="ending">Open AI</span>
      </Text>
      <HStack p={4}>
        <Text fontSize={14}>3</Text>
        <AiFillHeart color="#ff6c6c" cursor={"pointer"} />
        <AiOutlineHeart color="#ff6c6c" cursor={"pointer"} />
      </HStack>

      {/* <Box p={4}>
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box> */}
    </CustomBox>
  );
};

export default ResultItem;
