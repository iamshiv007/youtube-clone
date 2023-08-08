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
import { MdOutlineCastConnected } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { IoCompassOutline } from "react-icons/io5";

import SearchBox from "./SearchBox";
import { countries } from "../constants/Constants";
import YoutubeContext from "../../context/YoutubeContext";

const Header = () => {
  const { setCountry, country } = useContext(YoutubeContext);

  const [flag, setFlag] = useState(
    "https://t4.ftcdn.net/jpg/02/81/47/57/240_F_281475718_rlQONmoS2E3CJtv0zFv2HwZ1weGhxpff.jpg"
  );

  return (
    <>
      <Box
        borderBottomWidth="1px"
        borderColor={"#303030"}
        padding={{ base: "0px 20px", sm: "5px 20px", md: "8px 35px" }}
        borderStyle={"solid"}
        position={"sticky"}
        top={0}
        zIndex={10}
        bg={"#0f0f0f"}
      >
        <Flex
          height={{ base: "auto", sm: "auto", md: "10vh" }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <NavLink to="/">
            <Flex gap={1} alignItems={"center"}>
              <Image
                height={"7vh"}
                objectFit={"cover"}
                src={"/logo512.png"}
                alt="logo"
              />
              <Text color={"white"} fontWeight={"bold"}>
                YouTube
              </Text>
            </Flex>
          </NavLink>

          <Box display={{ base: "none", sm: "none", md: "block" }}>
            <SearchBox />
          </Box>

          <Box display={"flex"} gap={6} alignItems={"center"}>
            <Text
              display={{ base: "none", sm: "none", md: "block" }}
              fontSize={"xl"}
              color={"white"}
            >
              <BsCameraVideo />
            </Text>
            <Text
              display={{ base: "block", sm: "block", md: "none" }}
              fontSize={"xl"}
              color={"white"}
            >
              <MdOutlineCastConnected />
            </Text>
            <Text fontSize={"xl"} color={"white"}>
              <BsBell />
            </Text>
            <Text fontSize={"xl"} color={"white"}>
              <BiSearch />
            </Text>
            <Menu>
              <MenuButton>
                <Avatar
                  display={{ base: "none", sm: "none", md: "block" }}
                  size={"xs"}
                  name="Coutry"
                  src={flag}
                />
                <Avatar
                  display={{ base: "block", sm: "block", md: "none" }}
                  size={"xs"}
                  name="Avatar"
                  src={
                    "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                  }
                />
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

      <Box display={{ base: "block", sm: "block", md: "none" }}>
        <Flex
          className="hidden-scrollbar"
          width={"100%"}
          overflow={"scroll"}
          align={"center"}
          size={"xs"}
          padding={"5px 20px"}
          gap={4}
        >
          <Box
            color="white"
            bg={"#303030"}
            _hover={{ bg: "#424242" }}
            _active={{ bg: "#ededed", color: "black" }}
            fontSize={"2xl"}
            padding={"4px 8px"}
            borderRadius={"4px"}
          >
            <IoCompassOutline />
          </Box>
          {countries.map((country_) => (
            <Box
              onClick={() => setCountry(country_.countryCode)}
              key={country_.name}
              color={country === country_.countryCode ? "black" : "white"}
              bg={country === country_.countryCode ? "#ededed" : "#303030"}
              padding={"4px 8px"}
              borderRadius={"4px"}
            >
              {country_.name}
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  );
};

export default Header;
