import { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Lottie from "lottie-react";
import loginAnimation from "../../public/login.json";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../store/slices/authSlice";

const Login = () => {
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      await dispatch(login({ email, password })).unwrap();
      toast.success("Logged In successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        padding: "40px",
        gap: "40px",
      }}
    >
      <Box sx={{ flex: 1.2, display: { xs: "none", md: "flex" }, alignItems: "center", justifyContent: "center", height: "100%" }}>
        <Lottie animationData={loginAnimation} style={{ width: "100%", maxWidth: "800px" }} />
      </Box>

      <Box sx={{ flex: 1, marginRight: { xs: "10px", md: "100px" }, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "50px", maxWidth: "800px", width: "100%" }}>
        <motion.fieldset initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ border: "2px solid rgba(0, 0, 0, 0.2)", borderRadius: "12px", padding: "40px", width: "100%", maxWidth: "500px" }}>
          <legend style={{ fontSize: "1.8rem", fontWeight: "bold", padding: "0 15px", color: "black" }}>Login</legend>

          <TextField label="Email" type="email" fullWidth variant="outlined" sx={{ marginBottom: 3 }} value={email} onChange={(e) => setEmail(e.target.value)} />
          
          <TextField label="Password" type={showPassword ? "text" : "password"} fullWidth variant="outlined" sx={{ marginBottom: 3 }} value={password} onChange={(e) => setPassword(e.target.value)} InputProps={{ endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
            </InputAdornment>
          ), }} />

          <Typography variant="body2" sx={{ textAlign: "center", cursor: "pointer", color: "#1976d2", marginBottom: 3, "&:hover": { textDecoration: "underline" } }} onClick={() => navigate("/signup")}>
            Want to create an account? Click here
          </Typography>

          <Button variant="contained" fullWidth onClick={handleLogin} sx={{ backgroundColor: "black", color: "white", padding: "14px", fontSize: "18px", fontWeight: "bold", borderRadius: "10px", "&:hover": { backgroundColor: "#333" } }} component={motion.button} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }} animate={isLoading ? { scale: [1, 0.95, 1] } : {}} transition={{ repeat: isLoading ? Infinity : 0, duration: 0.6 }}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </motion.fieldset>
      </Box>
    </motion.div>
  );
};

export default Login;
