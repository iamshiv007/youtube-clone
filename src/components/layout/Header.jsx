import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../../images/Logo.png";

const Header = () => {
  return (
    <>
      <Box height={"12vh"} bg={"black"}>
        <Flex
          height={"12vh"}
          padding={"10px 35px"}
          gap={4}
          alignItems={"center"}
        >
          <Image height={"100%"} objectFit={"cover"} src={Logo} alt="logo" />
          <Text color={"white"}>Video Library</Text>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
