import { ImageList } from "@mui/material";
import React from "react";
import ProgressItem from "./ProgressItem";

const ProgressList = ({ files, addImageUrls }) => {
  return (
    <ImageList
      rowHeight={250}
      sx={{
        "&.MuiImageListItem-root": {
          gridTemplateColumns:
            "repeat(auto-fill, minmax(250px, 1fr)) !important",
        },
      }}
    >
      {files?.map((file, index) => (
        <ProgressItem file={file} key={index} addImageUrls={addImageUrls} />
      ))}
    </ImageList>
  );
};

export default ProgressList;
