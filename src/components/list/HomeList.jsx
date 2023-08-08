// import React, { useContext, useEffect } from "react";
// import { Grid } from "@chakra-ui/react";
// import { formatDistanceToNow } from "date-fns";

// import YoutubeContext from "../../context/YoutubeContext";
// import HomeVideoCard from "../cards/HomeVideoCard";
// import HomeSkeleton from "../layout/HomeSkeleton";

// const VideoList = () => {
//   const { isLoading, homeVideos, getHomeVideos, country } =
//     useContext(YoutubeContext);

//   useEffect(() => {
//     getHomeVideos();
//   }, [country]);

//   return (
//     <>
//       <Grid
//         gridTemplateColumns={"1fr 1fr 1fr"}
//         gap={5}
//         width="100%"
//         padding={"30px"}
//       >
//         {homeVideos &&
//           homeVideos.map((video) => (
//             <HomeVideoCard
//               key={video.id?.videoId}
//               videoId={video.id?.videoId}
//               channelId={video?.snippet?.channelId}
//               title={
//                 formateTitle(convertHtmlEntities(video.snippet?.title)) || ""
//               }
//               thumbnail={
//                 video.snippet?.thumbnails.high.url ||
//                 video.snippet?.thumbnails.medium.url ||
//                 ""
//               }
//               avatar={""}
//               postTime={
//                 video.snippet?.publishedAt
//                   ? timeConverter(video.snippet?.publishedAt)
//                   : ""
//               }
//               views={""}
//               channelName={video.snippet?.channelTitle || ""}
//             />
//           ))}
//         <HomeSkeleton />
//         <HomeSkeleton />
//         <HomeSkeleton />
//         <HomeSkeleton />
//         <HomeSkeleton />
//         <HomeSkeleton />
//         {isLoading ? (
//           <>
//             <HomeSkeleton />
//             <HomeSkeleton />
//             <HomeSkeleton />
//             <HomeSkeleton />
//             <HomeSkeleton />
//             <HomeSkeleton />
//             <HomeSkeleton />
//             <HomeSkeleton />
//           </>
//         ) : (
//           ""
//         )}
//       </Grid>
//     </>
//   );
// };

// export default VideoList;

// // Video Title
// const formateTitle = (title) => {
//   const char = title.split("");

//   if (char.length < 60) {
//     return title;
//   }

//   return `${char.slice(0, 60).join("")}...`;
// };

// // Convert HTML entities in title
// function convertHtmlEntities(inputString) {
//   const textarea = document.createElement("textarea");
//   textarea.innerHTML = inputString;
//   return textarea.value;
// }

// // Video Uploaded
// const timeConverter = (time) => {
//   const date = new Date(time);
//   return formatDistanceToNow(date, { addSuffix: true });
// };
