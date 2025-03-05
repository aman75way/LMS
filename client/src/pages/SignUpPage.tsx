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
import { signup } from "../store/slices/authSlice";
import { AppDispatch } from "../store/store";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>(); // ✅ Properly typed dispatch

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "INSTRUCTOR">("STUDENT");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const resultAction = await dispatch(signup({
        fullName,
        email,
        password,
        confirmPassword,
        role,
      }));
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error as string || "Signup failed");
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

          <TextField label="Full Name" type="text" fullWidth variant="outlined" sx={{ marginBottom: 3 }} value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <TextField label="Email" type="email" fullWidth variant="outlined" sx={{ marginBottom: 3 }} value={email} onChange={(e) => setEmail(e.target.value)} />

          <TextField select label="Role" fullWidth variant="outlined" sx={{ marginBottom: 3 }} value={role} onChange={(e) => setRole(e.target.value as "STUDENT" | "INSTRUCTOR")}>
            <MenuItem value="STUDENT">Student</MenuItem>
            <MenuItem value="INSTRUCTOR">Instructor</MenuItem>
          </TextField>

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

          <Typography variant="body2" sx={{ textAlign: "center", cursor: "pointer", color: "#1976d2", marginBottom: 3, "&:hover": { textDecoration: "underline" } }} onClick={() => navigate("/login")}>
            Already have an account? Log in here
          </Typography>

          <Button variant="contained" fullWidth onClick={handleSignUp} sx={{ backgroundColor: "black", color: "white", padding: "14px", fontSize: "18px", fontWeight: "bold", borderRadius: "10px", "&:hover": { backgroundColor: "#333" } }}>
            Sign Up
          </Button>
        </motion.fieldset>
      </Box>
    </motion.div>
  );
};

export default SignUp;
