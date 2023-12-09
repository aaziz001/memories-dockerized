import {
  ThumbUpAlt as ThumbUpAltIcon,
  ThumbUpAltOutlined as ThumbUpOutlinedIcon,
} from "@material-ui/icons";
import React from "react";

const Likes = ({ user, likes }) => {
  if (likes.length > 0) {
    return likes.find(
      (like) => like === (user?.result?.googleId || user?.result?._id)
    ) ? (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;
        {likes.length > 2
          ? `You and ${likes.length - 1} others`
          : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
      </>
    ) : (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
      </>
    );
  }

  return (
    <>
      <ThumbUpOutlinedIcon fontSize="small" />
      &nbsp;Like
    </>
  );
};

export default Likes;
