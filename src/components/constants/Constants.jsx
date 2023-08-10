import React from "react";
import { AiTwotoneFire } from "react-icons/ai";
import {
  MdSportsBaseball,
  MdSportsEsports,
  MdOutlineHealthAndSafety,
  MdScience,
  MdFastfood,
} from "react-icons/md";
import { BiCameraMovie, BiMoviePlay } from "react-icons/bi";
import { GiBrain } from "react-icons/gi";
import { FaSpaceAwesome } from "react-icons/fa6";
import { BsCodeSlash } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";

export const sidebarData = [
  { name: "Trending", icon: <AiTwotoneFire /> },
  { name: "Adveture and Movies", icon: <BiMoviePlay /> },
  { name: "Programming and Coding", icon: <BsCodeSlash /> },
  { name: "Science and Fact", icon: <MdScience /> },
  { name: "Technology and Space", icon: <FaSpaceAwesome /> },
  { name: "Business and Startups", icon: <FaUserTie /> },
  { name: "Sports and Highlightes", icon: <MdSportsBaseball /> },
  { name: "Movies and Webseries", icon: <BiCameraMovie /> },
  { name: "AI and ChatGpt", icon: <GiBrain /> },
  { name: "Health and Fitness", icon: <MdOutlineHealthAndSafety /> },
  { name: "Food and Blogging", icon: <MdFastfood /> },
  { name: "Gaming and Live", icon: <MdSportsEsports /> },
];

export const countries = [
  {
    name: "India",
    countryCode: "IN",
    url: "https://t4.ftcdn.net/jpg/02/81/47/57/240_F_281475718_rlQONmoS2E3CJtv0zFv2HwZ1weGhxpff.jpg",
  },
  {
    name: "America",
    countryCode: "US",
    url: "https://t3.ftcdn.net/jpg/02/70/24/98/240_F_270249859_mf1Kyad7MO3Gb1BGvBahbB9SNttnVZO7.jpg",
  },
  {
    name: "Germany",
    countryCode: "DE",
    url: "https://t3.ftcdn.net/jpg/04/44/28/64/240_F_444286454_6FR1VrzfVE8AJCwd28ft9T4pxEwH22Ng.jpg",
  },
  {
    name: "Japan",
    countryCode: "JP",
    url: "https://t3.ftcdn.net/jpg/01/79/73/80/240_F_179738020_0cdBcea7tUpPoFTCiiVfl6p9chD28tQz.jpg",
  },
  {
    name: "Canada",
    countryCode: "CA",
    url: "https://t3.ftcdn.net/jpg/01/71/57/72/240_F_171577280_Gj1SV9BV1vrvowWTexaiJW7OBj7uNgCT.jpg",
  },
  {
    name: "England",
    countryCode: "GB",
    url: "https://t3.ftcdn.net/jpg/06/01/92/56/240_F_601925600_OPd3C0QuEE283YX2Fj6v3QtFFnkdtETF.jpg",
  },
];
