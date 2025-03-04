import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  IconButton,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Lottie from "lottie-react";
import signupAnimation from "../../public/login.json";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signUpStart, signUpUser, signUpEnd } from "../store/slices/authSlice";
import { signUp } from "../services/authService";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "INSTRUCTOR">("STUDENT");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleSignUp = async (event: any) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(signUpStart());

    try {
      const response = await signUp(fullName, email, password, role);

      // Save user to Redux store
      dispatch(signUpUser(response.user));

      toast.success("Account created successfully!");
      navigate("/");
    } catch (error : any) {
      toast.error(error.message);
    } finally {
      dispatch(signUpEnd());
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
      {/* Left Side: Animation */}
      <Box
        sx={{
          flex: 1.2,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Lottie animationData={signupAnimation} style={{ width: "100%", maxWidth: "800px" }} />
      </Box>

      {/* Right Side: Sign Up Form */}
      <Box
        sx={{
          flex: 1,
          marginRight: { xs: "10px", md: "100px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <motion.fieldset
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            border: "2px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "12px",
            padding: "40px",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <legend style={{ fontSize: "1.8rem", fontWeight: "bold", padding: "0 15px", color: "black" }}>
            Sign Up
          </legend>

          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} style={{ width: "100%" }}>
            <TextField
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"
              sx={{ marginBottom: 3 }}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </motion.div>

          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} style={{ width: "100%" }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              sx={{ marginBottom: 3 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} style={{ width: "100%" }}>
            <TextField
              select
              label="Role"
              fullWidth
              variant="outlined"
              sx={{ marginBottom: 3 }}
              value={role}
              onChange={(e) => setRole(e.target.value as "STUDENT" | "INSTRUCTOR")}
            >
              <MenuItem value="STUDENT">Student</MenuItem>
              <MenuItem value="INSTRUCTOR">Instructor</MenuItem>
            </TextField>
          </motion.div>

          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} style={{ width: "100%" }}>
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: 3 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>

          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }} style={{ width: "100%" }}>
            <TextField
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: 3 }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </motion.div>

          {/* Login Link */}
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }}>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", cursor: "pointer", color: "#1976d2", marginBottom: 3, "&:hover": { textDecoration: "underline" } }}
              onClick={() => navigate("/login")}
            >
              Already have an account? Log in here
            </Typography>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }} style={{ width: "100%" }}>
            <Button variant="contained" fullWidth onClick={handleSignUp} sx={{ backgroundColor: "black", color: "white", padding: "14px", fontSize: "18px", fontWeight: "bold", borderRadius: "10px", "&:hover": { backgroundColor: "#333" } }}>
              Sign Up
            </Button>
          </motion.div>
        </motion.fieldset>
      </Box>
    </motion.div>
  );
};

export default SignUp;
