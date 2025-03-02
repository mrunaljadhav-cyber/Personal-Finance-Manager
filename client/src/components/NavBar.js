import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/auth.js";
import Cookies from "js-cookie";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function _logOut() {
    Cookies.remove("token");
    dispatch(logOut());
    navigate("/login");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: "green" }} position="static">
        <Toolbar>
          {isAuthenticated && (
            <IconButton
              size="large"
              color="inherit"
              onClick={handleMenu}
              sx={{ marginRight: 1 }}
            >
              <DashboardIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, marginRight: 2 }}>
            <Link to="/" className="text-white" style={{ textDecoration: 'none', color: 'white' }}>
              SpendSmartly!
            </Link>
          </Typography>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ marginTop: '40px' }}
          >
            <MenuItem onClick={() => { handleClose(); navigate('/'); }}>
              Transactions
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); navigate('/loans'); }}>
              Loans
            </MenuItem>
          </Menu>

          <Box sx={{ flexGrow: 1 }} />

          {user && isAuthenticated && (
            <Typography sx={{ marginRight: 2 }}>
              <i>{user.firstName} logged in </i>
            </Typography>
          )}
          {isAuthenticated && (
            <IconButton color="inherit" onClick={_logOut}>
              <LogoutIcon />
            </IconButton>
          )}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-white" style={{ textDecoration: 'none' }}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/register" className="text-white" style={{ textDecoration: 'none' }}>
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}