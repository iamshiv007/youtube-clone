import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { BiArrowBack, BiSearch } from "react-icons/bi";
import { MdKeyboardVoice } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { debounce } from "lodash";

import YoutubeContext from "../../context/YoutubeContext";

const MobileSearch = () => {
  const { generateAutocomplete, autocomplete } = useContext(YoutubeContext);
  const [searchText, setSearchText] = useState("");

  const generateAutocompleteFun = useCallback(
    debounce((query) => {
      generateAutocomplete(query);
    }, 500),
    []
  );
  
  const navigate = useNavigate();

  const searchFun = () => {
    navigate(`/?query=${searchText}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Box width={"100%"} minHeight={"100vh"} bg={"#0f0f0f"}>
        <Flex padding={"8px 15px"} align={"center"} gap={4}>
          <Text fontSize={"xl"} _hover={{ cursor: "pointer" }}>
            <NavLink to="/">
              <BiArrowBack color="white" />
            </NavLink>
          </Text>
          <InputGroup>
            <Input
              border={"none"}
              color={"white"}
              placeholder="Search YouTube"
              borderRadius={"30px"}
              bg={"#303030"}
              height={"fit-content"}
              padding={"5px 15px"}
              _focusVisible={false}
              value={searchText || ""}
              onChange={(e) => {
                setSearchText(e.target.value);
                generateAutocompleteFun(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  searchFun();
                }
              }}
            />
          </InputGroup>
          {!searchText && (
            <IconButton
              size={"sm"}
              bg={"#303030"}
              _hover={{ bg: "#424242" }}
              borderRadius="100%"
              aria-label="Mice"
              icon={<MdKeyboardVoice color="white" size={"24px"} />}
            />
          )}
        </Flex>

        <AutoSuggetionMobile autocomplete={autocomplete} />
      </Box>
    </>
  );
};

export default MobileSearch;

const AutoSuggetionMobile = ({ autocomplete }) => (
  <>
    <Flex direction={"column"} gap={2} marginTop={"15px"}>
      {autocomplete &&
        autocomplete.slice(0, 9).map((text) => (
          <Box key={text} _hover={{ bg: "#3a3a3a" }}>
            <NavLink to={`/?query=${text}`}>
              <Flex padding={"10px 15px"} align={"center"} gap={5}>
                <Text fontSize={"xl"}>
                  <BiSearch color={"white"} />
                </Text>
                <Text color={"white"}>{text}</Text>
              </Flex>
            </NavLink>
          </Box>
        ))}
    </Flex>
  </>
);
