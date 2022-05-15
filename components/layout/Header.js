import {
  Avatar,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import Logo from "../logo/Logo";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
import { AiOutlinePoweroff } from "react-icons/ai";
import NextLink from "next/link";
import { useAuth } from "../context/AuthContextProvider";
import Notifications from "./Notifications";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    userInfo: { displayName, photoURL },
    logOut,
  } = useAuth();

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

        <Notifications />
        <Menu placement="bottom-end">
          <MenuButton>
            <WrapItem cursor="pointer">
              <Avatar name={displayName} src={photoURL} />
            </WrapItem>
          </MenuButton>
          <MenuList>
            <MenuGroup>
              <NextLink href="/accountSettings">
                <MenuItem py={4}>
                  <RiUserSettingsLine size={15} /> &nbsp; Account Settings
                </MenuItem>
              </NextLink>
              <MenuItem py={4} onClick={logOut}>
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
