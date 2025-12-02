import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { ErrorBoundary } from "./components/ErrorBoundary";
import HomePage from "./pages/HomePage/HomePage";
import RoomPage from "./pages/RoomPage/RoomPage";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Routes>
        <Route index element={<HomePage />} />
        <Route
          path="room/:roomName"
          element={
            <ErrorBoundary>
              <RoomPage />
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
