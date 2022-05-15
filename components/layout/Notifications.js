import React from "react";
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

const Notifications = () => {
  const { data } = useGetAllNotifications();
  console.log(data);
  const notificationNumbers = data.length;
  return (
    <Popover isLazy placement="auto" autoFocus={false}>
      <PopoverTrigger>
        <Text
          color={"gray.400"}
          display="flex"
          cursor={"pointer"}
          position="relative"
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
              Notification {notificationNumbers > 1 ? "s" : ""} [
              {notificationNumbers}]
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton
              onClick={() => clearAllNotifications({ items: data })}
            />
            <PopoverBody p={4}>
              <VStack spacing={4}>
                {data.map((item) => (
                  <HStack
                    key={item.id}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <WrapItem>
                      <Avatar
                        name={item.sender.displayName}
                        src={item.sender.photoURL}
                        size={"sm"}
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
            <PopoverCloseButton />
            <PopoverBody>
              You'll get notification when someone likes your prompts.
            </PopoverBody>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
