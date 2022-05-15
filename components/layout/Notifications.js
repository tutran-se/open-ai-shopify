import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
  WrapItem,
} from "@chakra-ui/react";

import { BsFillBellFill } from "react-icons/bs";
import {
  clearAllNotifications,
  useGetAllNotifications,
} from "../../libs/notifications";
import { formatDistance } from "date-fns";
import Image from "next/image";

const Notifications = () => {
  const { data } = useGetAllNotifications();
  const notificationNumbers = data.length;
  const [isOpen, setIsOpen] = useState(false);
  const onClickClose = async () => {
    setIsOpen(false);
    await clearAllNotifications({ items: data });
  };
  return (
    <Popover isLazy placement="auto" autoFocus={false} isOpen={isOpen}>
      <PopoverTrigger>
        <Text
          color={"gray.400"}
          display="flex"
          cursor={"pointer"}
          position="relative"
          onClick={() => setIsOpen(true)}
        >
          <BsFillBellFill size={20} />
          {notificationNumbers !== 0 && (
            <Badge
              variant="solid"
              colorScheme="red"
              position={"absolute"}
              top="0"
              left="100%"
            >
              {notificationNumbers}
            </Badge>
          )}
        </Text>
      </PopoverTrigger>

      <PopoverContent>
        {notificationNumbers !== 0 && (
          <>
            <PopoverHeader fontWeight="semibold" py={4}>
              Notification{notificationNumbers > 1 ? "s" : ""} [
              {notificationNumbers}]
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton onClick={onClickClose} />
            <PopoverBody p={4}>
              <VStack spacing={4}>
                {data.map((item) => (
                  <HStack
                    key={item.id}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <WrapItem
                      cursor="pointer"
                      position={"relative"}
                      overflow="hidden"
                      width={"30px"}
                      height="30px"
                      borderRadius={"100%"}
                    >
                      <Image
                        src={item.sender.photoURL}
                        alt="avatar"
                        objectFit="cover"
                        layout="fill"
                      />
                    </WrapItem>
                    <Box>
                      <Text>
                        {item.sender.displayName} just liked your prompt
                      </Text>
                      <Text color={"gray.400"} fontSize="sm">
                        {formatDistance(
                          new Date(item.createdAt?.toDate()),
                          new Date(),
                          {
                            addSuffix: true,
                          }
                        )}
                      </Text>
                    </Box>
                  </HStack>
                ))}
              </VStack>
            </PopoverBody>
          </>
        )}

        {notificationNumbers === 0 && (
          <>
            <PopoverHeader fontWeight="semibold">No Notification</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton onClick={() => setIsOpen(false)} />
            <PopoverBody>
              You&apos;ll get a notification when someone likes your prompts.
            </PopoverBody>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
