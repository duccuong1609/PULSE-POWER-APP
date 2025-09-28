import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router";
import userQueries from "../queries/users.queries";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { CONST } from "@/config/const";

const PublicLayout = () => {
  
  const navigate = useNavigate();
  const refreshToken = localStorage.getItem(CONST.AXIOS.REFRESH_TOKEN);
  const accessToken = localStorage.getItem(CONST.AXIOS.ACCESS_TOKEN);
  const currentUser = useQuery(
    userQueries.currentUserQuery([], { staleTime: 1000 , enabled: Boolean(refreshToken && accessToken)})
  );
  useEffect(() => {
    if (currentUser.data) {
      navigate(`/${currentUser.data.username}/dashboard`);
    }
  }, [currentUser.data, navigate]);

  return (
    <>
      <AnimatePresence>
        {currentUser.isLoading && (
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
