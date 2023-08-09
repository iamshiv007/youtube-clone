import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiSearch, BiArrowBack } from "react-icons/bi";
import { MdKeyboardVoice } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import YoutubeContext from "../../context/YoutubeContext";

const SearchBox = ({ isSearch, setIsSearch }) => {
  const { generateAutocomplete, autocomplete } = useContext(YoutubeContext);
  const [searchText, setSearchText] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const inputRef = useRef();

  const generateAutocompleteFun = (query) => {
    var timer;

    clearTimeout(timer);
    timer = setTimeout(() => {
      generateAutocomplete(query);
    }, 800);
  };

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (event.target?.parentElement?.tagName === "A") return;
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestion(false);
      }
    };

    const handleFocusIn = (event) => {
      if (inputRef.current === event.target) {
        setShowSuggestion(true);
      } else {
        // setShowSuggestion(false);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("focusin", handleFocusIn);
  });

  // Access query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const query = queryParams.get("query");

  useEffect(() => {
    setSearchText(query);
    setShowSuggestion(false);
  }, [query]);

  const navigate = useNavigate();

  const searchFun = () => {
    navigate(`/?query=${searchText}`);
  };

  return (
    <>
      <Box
        display={{ base: "none", sm: "none", md: "flex" }}
        alignItems={"center"}
        gap={6}
      >
        <Box position={"relative"}>
          <Box display={"flex"} alignItems="center" width={"500px"}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <BiSearch size={"20px"} color="white" />
              </InputLeftElement>
              <Input
                ref={inputRef}
                focusBorderColor="#7373ff"
                borderColor={"#303030"}
                display={"flex"}
                alignItems={"center"}
                color={"white"}
                placeholder="Search"
                borderRadius={"30px 0 0 30px"}
                fontSize={"lg"}
                value={searchText || ""}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  generateAutocompleteFun(e.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    searchFun();
                    setShowSuggestion(false);
                  }
                }}
              />
            </InputGroup>
            <IconButton
              borderColor={"#303030"}
              borderWidth={"1px 1px 1px 0"}
              borderStyle={"solid"}
              borderRadius={"0 30px 30px 0"}
              bg={"#303030"}
              _hover={{ bg: "#424242" }}
              icon={<BiSearch size={"24px"} color="white" />}
              onClick={searchFun}
            />
          </Box>
          <Box
            position={"absolute"}
            top={"45px"}
            width="460px"
            hidden={!showSuggestion}
          >
            <AutoSuggestion autocomplete={autocomplete} />
          </Box>
        </Box>
        <Box>
          <IconButton
            bg={"#303030"}
            _hover={{ bg: "#424242" }}
            borderRadius="100%"
            aria-label="Mice"
            icon={<MdKeyboardVoice color="white" size={"24px"} />}
          />
        </Box>
      </Box>

      <MobileSearch
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        autocomplete={autocomplete}
        searchText={searchText}
        setSearchText={setSearchText}
        generateAutocompleteFun={generateAutocomplete}
        searchFun={searchFun}
      />
    </>
  );
};

export default SearchBox;

const AutoSuggestion = ({ autocomplete }) => (
  <>
    {autocomplete && autocomplete.length !== 0 && (
      <Box bg="#222222" borderRadius={"10px"} padding={"15px 0"}>
        {autocomplete.map((text) => (
          <NavLink to={`/?query=${text}`} key={text}>
            <Text
              display={"flex"}
              gap={4}
              alignItems={"center"}
              color="white"
              _hover={{ bg: "#3a3a3a" }}
              padding={"3px 10px"}
              fontSize={"lg"}
            >
              <BiSearch size={"20px"} color="white" />
              {text}
            </Text>
          </NavLink>
        ))}
      </Box>
    )}
  </>
);

const MobileSearch = ({
  isSearch,
  setIsSearch,
  autocomplete,
  searchText,
  setSearchText,
  generateAutocompleteFun,
  searchFun,
}) => (
  <>
    <Box
      display={isSearch ? "" : "none"}
      width={"100vw"}
      height={"100vh"}
      position={"fixed"}
      top={0}
      left={0}
      zIndex={12}
      bg={"#0f0f0f"}
    >
      <Flex padding={"8px 15px"} align={"center"} gap={4}>
        <Text
          fontSize={"xl"}
          _hover={{ cursor: "pointer" }}
          onClick={() => setIsSearch(false)}
        >
          <BiArrowBack color="white" />
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
                setIsSearch(false);
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

      <AutoSuggetionMobile
        setIsSearch={setIsSearch}
        autocomplete={autocomplete}
      />
    </Box>
  </>
);

const AutoSuggetionMobile = ({ autocomplete, setIsSearch }) => (
  <>
    <Flex direction={"column"} gap={2} marginTop={"15px"}>
      {autocomplete &&
        autocomplete.map((text) => (
          <Box
            key={text}
            _hover={{ bg: "#3a3a3a" }}
            onClick={() => setIsSearch(false)}
          >
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
