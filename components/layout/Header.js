import {
  Avatar,
  Badge,
  Box,
  Divider,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useColorMode,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import Logo from "../logo/Logo";
import { BsFillMoonFill, BsFillSunFill, BsFillBellFill } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
import { AiOutlinePoweroff } from "react-icons/ai";
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box display="flex" alignItems="center" py={5}>
      <Logo isClickable={true} width="30px" height="30px" />
      <HStack ml="auto" spacing={5}>
        <Text onClick={toggleColorMode} cursor="pointer" color={"gray.400"}>
          {colorMode === "light" ? (
            <BsFillMoonFill size={20} />
          ) : (
            <BsFillSunFill size={20} />
          )}
        </Text>

        <Popover isLazy placement="auto" autoFocus={false}>
          <PopoverTrigger>
            <Text color={"gray.400"} display="flex" cursor={"pointer"}>
              <BsFillBellFill size={20} />
              <Badge variant="solid" colorScheme="red">
                3
              </Badge>
            </Text>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight="semibold" py={4}>
              Notifications [3]
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <VStack>
                <HStack>
                  <WrapItem cursor="pointer">
                    <Avatar
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                      size={"sm"}
                    />
                  </WrapItem>
                  <Box>
                    <Text>Tom Cruise just like your prompt</Text>
                    <Text color={"gray.400"} fontSize="sm">
                      2 minutes ago
                    </Text>
                  </Box>
                </HStack>
                <Divider />
                <HStack>
                  <WrapItem cursor="pointer">
                    <Avatar
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                      size={"sm"}
                    />
                  </WrapItem>
                  <Box>
                    <Text>Tom Cruise just like your prompt</Text>
                    <Text color={"gray.400"} fontSize="sm">
                      2 minutes ago
                    </Text>
                  </Box>
                </HStack>
                <Divider />
                <HStack>
                  <WrapItem cursor="pointer">
                    <Avatar
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                      size={"sm"}
                    />
                  </WrapItem>
                  <Box>
                    <Text>Tom Cruise just like your prompt</Text>
                    <Text color={"gray.400"} fontSize="sm">
                      2 minutes ago
                    </Text>
                  </Box>
                </HStack>
              </VStack>
            </PopoverBody>
            {/* <PopoverHeader fontWeight="semibold">No Notification</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              You'll get notification when someone likes your prompts.
            </PopoverBody> */}
          </PopoverContent>
        </Popover>
        <Menu placement="bottom-end">
          <MenuButton>
            <WrapItem cursor="pointer">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </WrapItem>
          </MenuButton>
          <MenuList>
            <MenuGroup>
              <MenuItem py={4}>
                {" "}
                <RiUserSettingsLine size={15} /> &nbsp; Account Settings
              </MenuItem>
              <MenuItem py={4}>
                {" "}
                <AiOutlinePoweroff size={15} /> &nbsp;&nbsp;Log Out{" "}
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
};

export default Header;
