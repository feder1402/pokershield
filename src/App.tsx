import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import HomePage from './pages/HomePage/HomePage'
import RoomPage from './pages/RoomPage/RoomPage'

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:roomName" element={<RoomPage />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
