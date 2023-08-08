import {
  Avatar,
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsBell, BsCameraVideo } from "react-icons/bs";

import SearchBox from "./SearchBox";
import { countries } from "../constants/Constants";
import YoutubeContext from "../../context/YoutubeContext";

const Header = () => {
  const { setCountry } = useContext(YoutubeContext);

  const [flag, setFlag] = useState(
    "https://t4.ftcdn.net/jpg/02/81/47/57/240_F_281475718_rlQONmoS2E3CJtv0zFv2HwZ1weGhxpff.jpg"
  );

  return (
    <>
      <Box
        borderBottomWidth="1px"
        borderColor={"#303030"}
        padding={"8px 35px"}
        height={"10vh"}
        borderStyle={"solid"}
        position={"sticky"}
        top={0}
        zIndex={10}
        bg={"#0f0f0f"}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <NavLink to="/">
            <Flex gap={3} alignItems={"center"}>
              <Image
                height={"7vh"}
                objectFit={"cover"}
                src={"/logo512.png"}
                alt="logo"
              />
              <Text color={"white"}>YouTube Clone</Text>
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
            <Menu>
              <MenuButton>
                <Avatar size={"xs"} name="Coutry" src={flag} />
              </MenuButton>
              <Portal>
                <MenuList zIndex={11} bg={"#323232"}>
                  {countries.map((country) => (
                    <MenuItem
                      bg={"#323232"}
                      _hover={{ bg: "#5b5b5b" }}
                      color={"white"}
                      onClick={() => {
                        setFlag(country.url);
                        setCountry(country.countryCode);
                      }}
                      key={country.name}
                    >
                      {country.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
