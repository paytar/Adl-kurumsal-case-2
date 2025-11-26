import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Sidebar from "./layout/Sidebar";
import { ThemeProviderWrapper } from "./hooks/ThemeProvider";
import { SnackbarProvider } from "./context/SnackbarProvider";

function App() {
  return (
    <>
    <ThemeProviderWrapper>
       <SnackbarProvider>
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
        <main style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
      </main>
      </div>
      </SnackbarProvider>
      </ThemeProviderWrapper>
    </>
  );
}

export default App;
