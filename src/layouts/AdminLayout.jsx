import { useState } from "react";
import { Outlet } from "react-router";

const AdminLayout = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);

  return (
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
  );
};

export default AdminLayout;
