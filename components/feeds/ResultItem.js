import { Avatar, Box, HStack, Text, WrapItem } from "@chakra-ui/react";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Tooltip } from "@chakra-ui/react";
import { auth } from "../../config/firebase";
import { format, formatDistance } from "date-fns";
import { updateLike } from "../../libs/feeds";

const ResultItem = ({ item }) => {
  const {
    id,
    answer,
    createdAt,
    prompt,
    totalLike,
    whoLikes,
    creator: { displayName, photoURL },
  } = item;
  const user = auth.currentUser;
  const isLikedByCurrentUser =
    whoLikes.find((item) => item === user.uid) || false;
  return (
    <Box
      border={"1px"}
      borderColor="gray.600"
      rounded="md"
      boxShadow="lg"
      position="relative"
    >
      <Box bg={"whiteAlpha.200"} p={2}>
        <HStack>
          <Tooltip label={displayName}>
            <WrapItem>
              <Avatar name={displayName} src={photoURL} size={"sm"} />
            </WrapItem>
          </Tooltip>

          <Box>
            <Text fontSize={14}>{prompt}?</Text>
            {createdAt && (
              <Text fontSize={12} color="gray.400">
                {formatDistance(new Date(createdAt?.toDate()), new Date(), {
                  addSuffix: true,
                })}
                &nbsp;({format(new Date(createdAt?.toDate()), "dd MMM, yyyy")})
              </Text>
            )}
          </Box>
        </HStack>
      </Box>
      <Text padding={4} fontSize={14} fontStyle="italic">
        "{answer}"
      </Text>
      <Text
        px={4}
        fontSize={12}
        fontStyle="italic"
        color={"gray.400"}
        textAlign="right"
      >
        - Open AI
      </Text>

      <HStack p={4}>
        <Text fontSize={14} hidden={totalLike === 0}>
          {totalLike}
        </Text>

        {isLikedByCurrentUser && (
          <AiFillHeart
            color="#ff6c6c"
            cursor={"pointer"}
            onClick={() => updateLike({ action: "REMOVE_LIKE", item })}
          />
        )}
        {!isLikedByCurrentUser && (
          <AiOutlineHeart
            color="#ff6c6c"
            cursor={"pointer"}
            onClick={() => updateLike({ action: "LIKE", item })}
          />
        )}
      </HStack>
    </Box>
  );
};

export default ResultItem;
