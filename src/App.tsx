import './App.css'
import AuthPage from './app/auth/page';
import Dashboard from './app/dashboard/page'
import NotFound from './app/not-found/page';
import { ThemeProvider } from './components/theme-provider'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<AuthPage />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
