import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../../images/Logo.png";

const Header = () => {
  return (
    <>
      <Box bg={"black"} padding={"10px 35px"}>
        <Flex gap={4} alignItems={"center"}>
          <Image width={"44px"} objectFit={"cover"} src={Logo} alt="logo" />
          <Text color={"white"}>Video Library</Text>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
