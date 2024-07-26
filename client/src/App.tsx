import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { Box } from "@mui/material";
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignedOut, RedirectToSignIn, SignedIn } from "@clerk/clerk-react";
import Navbar from "@/scenes/navbar";
import Dashboard from"@/scenes/dashboard";
import Predictions from "@/scenes/Prediction";


function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          <SignedIn>
              <Navbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/predictions" element={<Predictions/>} />
              </Routes>
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
