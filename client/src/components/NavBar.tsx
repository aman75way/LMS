import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "motion/react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { AppDispatch, RootState } from "../store/store";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out from LMS");
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        backdropFilter: "blur(15px)",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
      }}
    >
      <AppBar position="static" sx={{ background: "transparent", boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 3 }}>
          {/* Logo / Home */}
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", cursor: "pointer", color: "black" }}
            onClick={() => navigate("/")}
          >
            EduLearn
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: "center" }}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Typography variant="body1" sx={{ cursor: "pointer", color: "black" }} onClick={() => navigate("/")}>
                HOME
              </Typography>
            </motion.div>

            {user?.role === "STUDENT" && (
              <>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Typography
                    variant="body1"
                    sx={{ cursor: "pointer", color: "black" }}
                    onClick={() => navigate("/courses")}
                  >
                    COURSES
                  </Typography>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Typography
                    variant="body1"
                    sx={{ cursor: "pointer", color: "black" }}
                    onClick={() => navigate("/enrollments")}
                  >
                    ENROLLMENTS
                  </Typography>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Typography
                    variant="body1"
                    sx={{ cursor: "pointer", color: "black" }}
                    onClick={() => navigate("/progress")}
                  >
                    PROGRESS
                  </Typography>
                </motion.div>
              </>
            )}

            {user?.role === "INSTRUCTOR" && (
              <>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Typography
                    variant="body1"
                    sx={{ cursor: "pointer", color: "black" }}
                    onClick={() => navigate("/my-courses")}
                  >
                    MY COURSES
                  </Typography>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Typography
                    variant="body1"
                    sx={{ cursor: "pointer", color: "black" }}
                    onClick={() => navigate("/create-course")}
                  >
                    CREATE COURSE
                  </Typography>
                </motion.div>
              </>
            )}

            {/* User Dropdown */}
            {user ? (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ color: "black", ml: 2 }}>
                  <AccountCircleIcon fontSize="large" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  sx={{
                    mt: 1,
                    "& .MuiPaper-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      color: "black",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <MenuItem disabled>{user.fullName} - {user.role}</MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: "black" }}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    px: 3,
                    py: 1,
                    borderRadius: "20px",
                    "&:hover": { backgroundColor: "#333" },
                  }}
                >
                  Sign Up / Login
                </Button>
              </motion.div>
            )}
          </Box>

          {/* Mobile Menu - Hamburger Icon */}
          <IconButton sx={{ display: { xs: "block", md: "none" }, color: "black" }} onClick={() => setMobileOpen(true)}>
            <MenuIcon fontSize="large" />
          </IconButton>

          {/* Mobile Drawer */}
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            sx={{
              "& .MuiPaper-root": {
                width: "250px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <List sx={{ mt: 2 }}>
              <ListItem button onClick={() => { navigate("/"); setMobileOpen(false); }}>
                <ListItemText primary="HOME" />
              </ListItem>

              {user?.role === "STUDENT" && (
                <>
                  <ListItem button onClick={() => { navigate("/courses"); setMobileOpen(false); }}>
                    <ListItemText primary="COURSES" />
                  </ListItem>
                  <ListItem button onClick={() => { navigate("/enrollments"); setMobileOpen(false); }}>
                    <ListItemText primary="ENROLLMENTS" />
                  </ListItem>
                  <ListItem button onClick={() => { navigate("/progress"); setMobileOpen(false); }}>
                    <ListItemText primary="PROGRESS" />
                  </ListItem>
                </>
              )}

              {user?.role === "INSTRUCTOR" && (
                <>
                  <ListItem button onClick={() => { navigate("/my-courses"); setMobileOpen(false); }}>
                    <ListItemText primary="MY COURSES" />
                  </ListItem>
                  <ListItem button onClick={() => { navigate("/create-course"); setMobileOpen(false); }}>
                    <ListItemText primary="CREATE COURSE" />
                  </ListItem>
                </>
              )}

              {user ? <ListItem button onClick={handleLogout}><ListItemText primary="LOGOUT" /></ListItem> : null}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Navbar;
