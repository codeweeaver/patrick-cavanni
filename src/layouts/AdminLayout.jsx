import { useState } from "react";
import { Outlet } from "react-router";
import AnimatedPage from "../components/global/AnimatedPage.jsx";

const AdminLayout = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);

  return (
    <AnimatedPage>
      <div>
        <main
          className={`${
            !toggleSidebar ? "m-0" : "ml-20 md:ml-[180px]"
          } transition-all duration-75 ease-in-out `}
        >
          <AdminHeader setToggle={setToggleSidebar} />
          <div className="px-8 m-h-[calc(100% - 70px)]">
            <Outlet />
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
};

export default AdminLayout;
