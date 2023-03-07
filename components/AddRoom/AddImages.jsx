import React, { useState } from "react";
import { Paper, Box, Input } from "@mui/material";
import { useDropzone } from "react-dropzone";
import ImagesList from "./ImagesList";
import ProgressList from "../ProgressLists/ProgressList";

const AddImages = () => {
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  const addImageUrls = (newUrl) => {
    setImageUrls((prev) => [...prev, newUrl]);
  };

  return (
    <>
      <Paper
        sx={{
          cursor: "pointer",
          backgroundColor: "#fafafa",
          color: "#bdbdbd",
          border: "1px dashed #ccc",
          "&:hover": {
            border: "1px dashed #ccc",
          },
        }}
      >
        <Box
          sx={{
            padding: "16px",
          }}
          {...getRootProps()}
        >
          <Input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ color: "green" }}>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
          <em>images with .jpeg, png or jpg extension will be accepted</em>
        </Box>
      </Paper>
      <ProgressList files={files} addImageUrls={addImageUrls} />
      {imageUrls?.length > 0 && (
        <ImagesList images={imageUrls} setImageUrls={setImageUrls} />
      )}
    </>
  );
};

export default AddImages;
