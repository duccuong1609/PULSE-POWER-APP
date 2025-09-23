import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router";
import userQueries from "../queries/users.queries";
import NotFound from "../not-found/page";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import authQueries from "../queries/auth.queries";
import { CONST } from "@/config/const";

const MIN_LOADING_TIME = 1000;

const ProtectedLayout = () => {
  /**
   * STATE AND NAVIGATION
   */
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem(CONST.AXIOS.REFRESH_TOKEN);
  const accessToken = localStorage.getItem(CONST.AXIOS.ACCESS_TOKEN);
  const userInfoQuery = useQuery(
    userQueries.currentUserQuery([], {
      staleTime: 1000,
      enabled: Boolean(refreshToken && accessToken),
    })
  );
  const refreshTokenQuery = useQuery(authQueries.refreshTokenQuery());
  useEffect(() => {
    if (!refreshToken || !accessToken) {
      navigate("/login");
    }
  }, [refreshToken, accessToken]);

  /**
   * ANIMATION LOADING ASYNC DATA WITH MIN LOADING TIME
   */
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (userInfoQuery.isLoading) {
      setShowLoader(true);
    } else {
      timer = setTimeout(() => setShowLoader(false), MIN_LOADING_TIME);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [userInfoQuery.isLoading]);

  /*
   * HANDLING PAGE ERRORS
   */
  if (userInfoQuery.isError || refreshTokenQuery.isError) {
    return <NotFound />;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <Outlet />
      </SidebarInset>

      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-xl"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Spinner variant="pinwheel" />
          </motion.div>
        )}
      </AnimatePresence>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
