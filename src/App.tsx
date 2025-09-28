import "./App.css";
import AuthPage from "./app/auth/page";
import Dashboard from "./app/(protected)/dashboard/page";
import Info from "./app/(protected)/info/page";
import NotFound from "./app/not-found/page";
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./app/(protected)/layout";
import Analytic from "./app/(protected)/analytic/page";
import Setting from "./app/(protected)/setting/page";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PublicLayout from "./app/auth/layout";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <BrowserRouter>
            <Routes>
              <Route path="/:user" element={<ProtectedLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="info" element={<Info />} />
                <Route path="analytic" element={<Analytic />} />
                <Route path="setting" element={<Setting />} />
              </Route>
              <Route element={<PublicLayout />}>
                <Route path="/login" element={<AuthPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </QueryClientProvider>
    </>
  );
}

export default App;
