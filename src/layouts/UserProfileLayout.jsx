import {AnimatePresence, motion} from "framer-motion";
import {FiHeart, FiLogOut, FiSettings, FiShoppingBag, FiShoppingCart, FiUser} from "react-icons/fi";
import {NavLink, Outlet, useLocation} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const UserProfileLayout = () => {
    const {user, logout} = useAuth();
    const location = useLocation();

    return (
        <div className="min-h-screen bg-accent/5 py-12 px-4">
            <div className="container flex flex-col lg:flex-row gap-8">

                {/* --- THE EXACT SIDEBAR CARD --- */}
                <aside className="self-start w-full lg:w-[340px] shrink-0 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">

                        {/* Header: Profile Info */}
                        <div className="p-5 flex items-center gap-4">
                            <div className="relative">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user?.name}&background=E8ECEF&color=2D3748`}
                                    alt="Avatar"
                                    className="w-14 h-14 rounded-full object-cover border border-gray-100"
                                />
                                <div
                                    className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></div>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-[18px] font-bold text-primary leading-tight">
                                    {user?.name || "User"}
                                </h2>
                                <span className="text-[14px] text-gray-600">
                  {user?.email || "hellomahmud@gmail.com"}
                </span>
                            </div>
                        </div>

                        <div className="h-px bg-slate-100"/>

                        {/* Menu Items */}
                        <nav className="p-2">
                            <ProfileLink to="." icon={<FiUser/>} label="View Profile" end/>
                            <ProfileLink to="cart" icon={<FiShoppingCart/>} label="Cart"/>
                            <ProfileLink to="wishlist" icon={<FiHeart/>} label="Wishlist"/>
                            <ProfileLink to="orders" icon={<FiShoppingBag/>} label="Orders"/>

                            <div className="h-px bg-slate-100 my-2"/>
                            <ProfileLink to="settings" icon={<FiSettings/>} label="Account Settings"/>


                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-4 px-4 py-3.5 text-accent hover:bg-red-50 rounded-lg transition-colors group"
                            >
                                <FiLogOut className="text-xl"/>
                                <span className="text-[16px] font-semibold">Log Out</span>
                            </button>
                        </nav>
                </aside>

                {/* --- CONTENT AREA --- */}

                    <AnimatePresence mode="wait">
                        <motion.main
                            key={location.pathname}
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            className="bg-white rounded-xl border border-gray-100 shadow-sm min-h-[500px] py-4 px-8 flex-1"
                        >
                            <Outlet/>
                        </motion.main>
                    </AnimatePresence>
            </div>
        </div>
    );
};

// Helper Component for the Exact Link Style
const ProfileLink = ({to, icon, label, end}) => (
    <NavLink
        to={to}
        end={end}
        className={({isActive}) => `
      flex items-center gap-4 px-4 py-3.5 rounded-lg mb-2 transition-all duration-200 group
      ${isActive ? "bg-accent/5 text-gray-900" : "text-gray-600 hover:bg-accent/5"}
    `}
    >
    <span className="text-xl text-slate-500 group-hover:text-slate-900 transition-colors">
      {icon}
    </span>
        <span className="text-[16px] font-semibold flex-1">{label}</span>
    </NavLink>
);

export default UserProfileLayout;