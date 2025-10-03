import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CONST } from "@/config/const";
import { useLoading } from "@/hooks/use-loading";
import { Loading } from "@/components/loading";
import userQueries from "@/app/queries/users.queries";
import authQueries from "@/app/queries/auth.queries";
import NotFound from "@/app/not-found/page";
import { useUserStore } from "@/store/userStore";

const ProtectedLayout = () => {
  /**
   * STATE AND NAVIGATION
   */
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem(CONST.AXIOS.REFRESH_TOKEN);
  const accessToken = localStorage.getItem(CONST.AXIOS.ACCESS_TOKEN);
  const { setUserParam } = useUserStore();
  const [fetchedAccessToken, setFetchedAccessToken] = useState<string | null>(
    null
  );

  const refreshTokenQuery = useQuery(
    authQueries.refreshTokenQuery([], {
      enabled: Boolean(refreshToken && accessToken),
    })
  );

  const userInfoQuery = useQuery(
    userQueries.currentUserQuery([], {
      staleTime: 1000,
      enabled: Boolean(fetchedAccessToken),
    })
  );

  useEffect(() => {
    if (refreshTokenQuery.isSuccess) {
      setFetchedAccessToken(refreshTokenQuery.data.access_token);
      localStorage.setItem(
        CONST.AXIOS.ACCESS_TOKEN,
        refreshTokenQuery.data.access_token
      );
      setUserParam(userInfoQuery.data?.username || "user");
    }
  }, [refreshTokenQuery.isSuccess, refreshTokenQuery.data?.access_token]);

  useEffect(() => {
    if (!refreshToken || !accessToken) {
      navigate("/login");
    }
  }, [refreshToken, accessToken]);

  const showLoader = useLoading(
    userInfoQuery.isLoading,
    CONST.MIN_LOADING_TIME
  );

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
        <Loading show={showLoader} />
      </AnimatePresence>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
