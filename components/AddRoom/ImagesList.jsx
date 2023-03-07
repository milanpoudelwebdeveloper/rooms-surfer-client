import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import React from "react";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebase/config";

import { toast } from "react-toastify";
import { Cancel } from "@mui/icons-material";

const ImagesList = ({ images, setImageUrls }) => {
  const handleDelete = async (image) => {
    const findIndex = images.findIndex((img) => img === image);
    if (findIndex > -1) {
      try {
        const storageRef = ref(storage, image);
        await deleteObject(storageRef);
        setImageUrls((prev) => prev.filter((img) => img !== image));
        toast.success("Image deleted successfully");
      } catch (e) {
        console.log("Something went wrong while deleting image", e);
        toast.error(e.message ?? "Something went wrong while deleting image");
      }
    }
  };
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
      {images?.map((image, index) => (
        <ImageListItem key={index} cols={1} rows={1}>
          <img
            src={image}
            alt="rooms"
            loading="lazy"
            style={{ height: "100%" }}
          />
          <ImageListItemBar
            position="top"
            sx={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
            }}
            actionIcon={
              <IconButton
                sx={{
                  color: "white",
                }}
                onClick={() => handleDelete(image)}
              >
                <Cancel />
              </IconButton>
            }
          ></ImageListItemBar>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImagesList;
