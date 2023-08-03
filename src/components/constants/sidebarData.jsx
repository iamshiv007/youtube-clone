import { AiFillHome, AiTwotoneFire } from "react-icons/ai";
import { MdSportsBaseball, MdSportsEsports } from "react-icons/md";
import { BiCameraMovie, BiSolidBookReader } from "react-icons/bi";
import { FaRegLaughSquint } from "react-icons/fa";
import { GiLoveSong } from "react-icons/gi";
import { DiReact } from "react-icons/di";
import { RiJavascriptFill } from "react-icons/ri";

export const sidebarData = [
  { name: "Home", icon: <AiFillHome /> },
  { name: "Trending", icon: <AiTwotoneFire /> },
  { name: "JavaScript", icon: <RiJavascriptFill /> },
  { name: "React", icon: <DiReact /> },
  { name: "Comedy", icon: <FaRegLaughSquint /> },
  { name: "Songs", icon: <GiLoveSong /> },
  { name: "Learning", icon: <BiSolidBookReader /> },
  { name: "Sports", icon: <MdSportsBaseball /> },
  { name: "movies", icon: <BiCameraMovie /> },
  { name: "Gaming", icon: <MdSportsEsports /> },
];
