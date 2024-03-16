"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, TextField, Typography } from "@mui/material";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    if (user.email === "" || user.password === "" || user.username === "") {
      alert('Please enter the Username, email and password');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/user/signup", user);
      router.push("/login");
    } catch (error) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-around h-screen" 
      style={
      {
        backgroundImage: "url('data:image/jpeg;base64,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')", 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover", 
        backgroundPosition: "center"
      }
    }
    >
      <div style={{
        fontFamily: "Calibri",
        fontSize: "90px",
        color: "#AD7B19",
        textShadow: "2px 2px 4px rgb(0, 0, 0, 0.5)",
        background: "linear-gradient(to right, #ffdb58, #ffd700)",
        backgroundClip: "text"
      }}>
      Brewery Review System
      </div>

      <div className="flex flex-col items-center justify-center">
        <Typography variant="h5" 
          style={{ 
            fontFamily: "Calibri",
            marginBottom: "0.5rem" 
          }}> 
          Sign Up
        </Typography>
        <hr style={{ width: "75%", marginBottom: "1rem" }} />
        <TextField
          margin="normal"
          required id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <TextField
          margin="normal"
          required id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          margin="normal"
          required name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          onClick={onSignup}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign Up
        </Button>
        <Link href="/login" style={{ color: "#3f51b6" }}>Have an account? Login</Link>
      </div>
    </div>
  );
}
