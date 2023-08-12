import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiSearch } from "react-icons/bi";
import { MdKeyboardVoice } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";

import YoutubeContext from "../../context/YoutubeContext";

const SearchBox = () => {
  const { generateAutocomplete, autocomplete } = useContext(YoutubeContext);
  const [searchText, setSearchText] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const inputRef = useRef();

  const generateAutocompleteFun = useCallback(
    debounce((query) => {
      generateAutocomplete(query);
    }, 500),
    []
  );

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
