import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router";
import userQueries from "../../queries/users.queries";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { CONST } from "@/config/const";
import { useLoading } from "@/hooks/use-loading";
import { Loading } from "@/components/loading";

const PublicLayout = () => {
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem(CONST.AXIOS.REFRESH_TOKEN);
  const accessToken = localStorage.getItem(CONST.AXIOS.ACCESS_TOKEN);

  const userInfoQuery = useQuery(
    userQueries.currentUserQuery([], {
      staleTime: 1000,
      enabled: Boolean(refreshToken && accessToken),
    })
  );

  useEffect(() => {
    if (userInfoQuery.data) {
      navigate(`/${userInfoQuery.data.username}/dashboard`);
    }
  }, [userInfoQuery.data, navigate]);

  const showLoader = useLoading(
    userInfoQuery.isLoading,
    CONST.MIN_LOADING_TIME
  );

  return (
    <>
      <AnimatePresence>
        <Loading show={showLoader} />
        {userInfoQuery.isLoading && (
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
      <Outlet />
    </>
  );
};

export default PublicLayout;
