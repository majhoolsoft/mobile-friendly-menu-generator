import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import QR from "../QR.svg";
// import SupportPage from "../routes/Support";
import { Link } from "react-router-dom";
// import { red } from "@mui/material/colors";
// import { color } from "@mui/system";
// import Home from "../routes/Home";
// import Dashboard from "../routes/Dashboard";
import { LoginButton, LogoutButton } from "./index.js";
import { useAuth0 } from "@auth0/auth0-react";

const pages = ["Pricing", "Support", "Free Trial"];
const settings = ["Dashboard"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, isAuthenticated } = useAuth0();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <img
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            width={"7%"}
            height={"auto"}
            src={QR}
            alt={"Menu maker app logo"}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {page}
              </Button>
            ))}
            {!isAuthenticated ? (
              <LoginButton />
            ) : (
              <React.Fragment>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.name} src={user.picture} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  // keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <LogoutButton />
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={handleCloseUserMenu}
                      sx={{
                        bgcolor: "primary.verydark",
                        p: 2,
                        px: 3,
                        mt: -1,
                        mb: -1,
                      }}
                    >
                      <Link to={setting} className="text-link">
                        {" "}
                        <Typography textAlign="center" component={"span"}>
                          {setting}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </React.Fragment>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
