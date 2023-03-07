import { CheckCircleOutline } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { storage } from "../../firebase/config";
import CircularProgressWithLabel from "./CircularProgressWithLabel";

const ProgressItem = ({ file, addImageUrls }) => {
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setImageUrl(URL.createObjectURL(file));
    const uploadTask = uploadBytesResumable(
      ref(storage, `rooms/${user?.id}/${file.name}`),
      file
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log("Something went wrong while uploading image", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(null);
          addImageUrls(downloadURL);
        });
      }
    );
  }, [file]);
  return (
    <Box>
      {imageUrl && (
        <ImageListItem cols={1} rows={1}>
          <img src={imageUrl} alt="gallery" loading="lazy" />
          <Box sx={BackDrop}>
            {progress < 100 ? (
              <CircularProgressWithLabel value={progress} />
            ) : (
              <CheckCircleOutline
                sx={{ width: 60, height: 60, color: "green" }}
              />
            )}
          </Box>
        </ImageListItem>
      )}
    </Box>
  );
};

export default ProgressItem;

const BackDrop = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
};
