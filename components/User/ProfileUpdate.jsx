import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Close, Send } from "@mui/icons-material";

import { axiosInstance } from "../../axiosInstance";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/config";
import { toast } from "react-toastify";

const ProfileUpdate = ({ isOpen, handleClose }) => {
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const nameRef = useRef();
  const { user, updateUser } = useContext(AuthContext);

  useEffect(() => {
    if (photo) {
      uploadPhoto();
    }
  }, [photo]);

  const photoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const uploadPhoto = () => {
    const uploadTask = uploadBytesResumable(
      ref(storage, `profile/${photo.name}`),
      photo
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPhotoUrl(downloadURL);
        });
      }
    );
  };

  const updateProfile = (e) => {
    e.preventDefault();
    axiosInstance
      .put("/users/update/" + user?.id, {
        name: nameRef.current.value,
        photourl: photoUrl,
      })
      .then((res) => {
        toast.success(res?.data?.message);
        updateUser(res?.data?.user);
        handleClose();
      })
      .catch((e) => {
        console.log(e.response.data);
        toast.error(
          e?.response?.data ?? "Something went wrong while updating the profile"
        );
      });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        Profile
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={updateProfile}>
        <DialogContent dividers>
          <DialogContentText>
            You can update your profile by updating these fields:
          </DialogContentText>

          <TextField
            autoFocus
            margin="normal"
            variant="standard"
            id="name"
            label="Name"
            type="text"
            fullWidth
            inputRef={nameRef}
            inputProps={{ minLength: 2 }}
            required
            defaultValue={user?.name}
            sx={{ mb: 4 }}
          />
          <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: "none" }}
              onChange={photoChange}
            />
            <Avatar
              src={user?.photourl || photoUrl}
              sx={{ width: 75, height: 75, cursor: "pointer" }}
            />
          </label>
        </DialogContent>
        <DialogActions sx={{ px: "19px" }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProfileUpdate;
