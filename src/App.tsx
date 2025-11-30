import "./style/App.css";
import AuthPage from "./app/pages/auth/page";
import NotFound from "./app/not-found/page";
import { ThemeProvider } from "./components/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./lib/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PublicLayout from "./app/pages/auth/layout";
import RootPage from "./app/pages/root/page";
import ProtectedLayout from "./app/pages/(protected)/layout";
import Analytic from "./app/pages/(protected)/analytic/page";
import Setting from "./app/pages/(protected)/setting/page";
import Dashboard from "./app/pages/(protected)/dashboard/page";
import Info from "./app/pages/(protected)/info/page";
import AnalyticProduct from "./app/pages/(protected)/analytic.product/page";
import AnalyticCustomer from "./app/pages/(protected)/analytic.customer/page";
import Cart from "./app/pages/(protected)/cart";

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
                <Route path="cart" element={<Cart />} />
                <Route>
                  <Route path="analytic" element={<Analytic />} />
                  <Route path="analytic/product" element={<AnalyticProduct />} />
                  <Route path="analytic/customer" element={<AnalyticCustomer />} />
                </Route>
                <Route path="setting" element={<Setting />} />
              </Route>
              <Route element={<PublicLayout />}>
                <Route path="login" element={<AuthPage />} />
              </Route>
              <Route path="/" element={<RootPage />} />
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
