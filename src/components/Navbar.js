import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const theme = createTheme({
  palette: {
    ochre: {
      main: "#AD7B19",
      light: "#E9DB5D",
      dark: "#A29415",
      contrastText: "#242105",
    },
  },
});
export default function Navbar() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/user/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" color="ochre">
          <Toolbar className="flex justify-between">
          <div style={{
            fontFamily: "Calibri",
            fontSize: "40px",
            color: "#DCCDB0",
            textShadow: "1px 1px 4px rgb(0, 0, 0, 0.2)",
          }}>
          Brewery Review System
          </div>
            <Button color="inherit" 
            style={{
              fontFamily: "Calibri",
              fontSize: "30px",
              color: "#DCCDB0",
              textShadow: "1px 1px 4px rgb(0, 0, 0, 0.2)",
            }}
            onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
