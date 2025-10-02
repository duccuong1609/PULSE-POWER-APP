
import ProtectedLayout from "../(protected)/layout";
import PublicLayout from "../auth/layout";

const RootPage = () => {
  return (
    <>
      <PublicLayout />
      <ProtectedLayout />
    </>
  );
};

export default RootPage;