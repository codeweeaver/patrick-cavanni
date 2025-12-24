import { Outlet } from "react-router-dom";
import AnimatedPage from "../components/global/AnimatedPage";

const UserProfileLayout = () => {
  return (
    <AnimatedPage>
      <div>UserProfileLayout</div>

      <main>
        <Outlet />
      </main>
    </AnimatedPage>
  );
};

export default UserProfileLayout;
