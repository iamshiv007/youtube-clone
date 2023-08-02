import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../../images/Logo.png";
import { NavLink } from "react-router-dom";
import SearchBox from "./SearchBox";
import { BsBell, BsCameraVideo } from "react-icons/bs";

const Header = () => {
  return (
    <>
      <Box
        borderBottomWidth="1px"
        borderColor={"gray"}
        padding={"8px 35px"}
        height={"10vh"}
        borderStyle={"solid"}
        position={"sticky"}
        top={0}
        zIndex={10}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <NavLink to="/">
            <Flex gap={3} alignItems={"center"}>
              <Image height={"7vh"} objectFit={"cover"} src={Logo} alt="logo" />
              <Text color={"white"}>Video Library</Text>
            </Flex>
          </NavLink>

          <Box>
            <SearchBox />
          </Box>

          <Box display={"flex"} gap={6} alignItems={"center"}>
            <Text fontSize={"xl"} color={"white"}>
              <BsCameraVideo />
            </Text>
            <Text fontSize={"xl"} color={"white"}>
              <BsBell />
            </Text>
            <Avatar
              size={"sm"}
              name="Shivraj Gurjar"
              src="https://bit.ly/tioluwani-kolawole"
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
