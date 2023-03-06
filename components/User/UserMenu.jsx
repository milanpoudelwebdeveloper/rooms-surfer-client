import { Logout, Settings } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { axiosInstance } from "../../axiosInstance";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import ProfileUpdate from "./ProfileUpdate";

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
  const { logoutUser } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null);
  };

  const logOut = () => {
    axiosInstance
      .get("/auth/logout")
      .then((res) => {
        toast.success(res.data.message);
        logoutUser();
      })
      .catch((e) => {
        toast.error(
          e.response.data.message ?? "Something went wrong while logging out"
        );
      });
  };

  return (
    <>
      <Menu
        anchorEl={anchorUserMenu}
        open={Boolean(anchorUserMenu)}
        onClick={handleCloseUserMenu}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => setOpenUpdate(true)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Log Out
        </MenuItem>
      </Menu>
      <ProfileUpdate
        isOpen={openUpdate}
        handleClose={() => setOpenUpdate(false)}
      />
    </>
  );
};

export default UserMenu;
