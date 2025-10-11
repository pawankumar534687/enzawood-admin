import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoTimerOutline } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { BsSubstack } from "react-icons/bs";
import { SiLevelsdotfyi } from "react-icons/si";
import { GiFalloutShelter } from "react-icons/gi";
import { CiImageOn } from "react-icons/ci";
import { MdDiscount } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { LuMessageCircleMore } from "react-icons/lu";
import { Outlet } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
     localStorage.clear();
    window.location.href = "/admin";
  };
 


  return (
    <div className="min-h-screen   flex flex-col bg-gray-100">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-white shadow">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            className="md:hidden bg-gray-800 text-white px-3 py-2 rounded-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            Menu
          </button>

          <h1 className="text-2xl font-bold text-gray-800">
            EnzaWood Admin Panel
          </h1>
        </div>

        <div className="flex max-md:hidden items-center space-x-4">
          <Link
            to="http://localhost:5173/"
            className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700"
          >
            Go To Website
          </Link>
          <button onClick={logout} className="bg-red-500 text-white px-4 cursor-pointer py-2 rounded-2xl hover:bg-red-600">
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-screen  pt-16">
        {sidebarOpen && (
          <aside
            className="bg-pink-500

 text-white p-2 w-64 space-y-4 z-30 fixed top-16 left-0 md:hidden overflow-y-auto h-[calc(100vh-4rem)]"
          >
            <div className="flex flex-col mb-4 ">
              <nav className="ml-8 ">
                <ul className="space-y-2 ">
                  <li>
                    <Link
                      to="/"
                      className="flex items-center  p-2 gap-4 rounded-2xl hover:bg-gray-700"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <IoTimerOutline className="w-6 h-6" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/manage-orders"
                      className="flex items-center  p-2 gap-4 rounded-2xl hover:bg-gray-700"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <FaTruck className="w-5 h-5" />
                      Manage Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/all-category"
                      className="flex items-center  p-2 gap-4 rounded-2xl hover:bg-gray-700"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <MdCategory className="w-5 h-5" />
                      All Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/all-sub-category"
                      className="flex items-center  p-2 gap-4 rounded-2xl hover:bg-gray-700"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <BsSubstack className="w-4 h-4" />
                      All Sub Category
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/all-level-image"
                      className="flex items-center  p-2 gap-4 rounded-2xl hover:bg-gray-700"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <SiLevelsdotfyi className="w-5 h-5" />
                      All Level Images
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      to="/all-products"
                      className="flex items-center  p-2 gap-4 rounded-2xl hover:bg-gray-700"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <GiFalloutShelter className="w-5 h-5" />
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/manage-review"
                      className="flex items-center  p-2 gap-4 rounded-2xl hover:bg-gray-700"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <CiImageOn className="w-5 h-5" />
                      Manage Banners
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/manage-coupons"
                      className="flex items-center  p-2 gap-4 rounded-2xl hover:bg-gray-700"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <MdDiscount className="w-5 h-5" />
                      Manage Coupons
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/all-users"
                      className="flex items-center  p-2 gap-4 rounded-2xl hover:bg-gray-700"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <FaUsers className="w-5 h-5" />
                      All Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/all-inquiries"
                      className="flex items-center  p-2 gap-4 rounded-2xl hover:bg-gray-700"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <LuMessageCircleMore className="w-5 h-5" />
                      All Inquiries
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
        )}

        {/* Desktop Sidebar */}
        <aside
          className="hidden md:flex flex-col bg-pink-500
 text-white p-6 w-64 fixed top-16 left-0 h-[calc(100vh-4rem)] z-30"
        >
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="flex items-center p-2 rounded-2xl gap-4 hover:bg-gray-700"
                >
                  <IoTimerOutline className="w-6 h-6" />
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/manage-orders"
                  className="flex items-center p-2 gap-4 rounded-2xl hover:bg-gray-700"
                >
                  <FaTruck className="w-5 h-5" />
                  Manage Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/all-category"
                  className="flex items-center p-2 gap-4 rounded-2xl hover:bg-gray-700"
                >
                  <MdCategory className="w-5 h-5" />
                  All Category
                </Link>
              </li>
              <li>
                <Link
                  to="/all-sub-category"
                  className="flex items-center p-2 gap-4 rounded-2xl hover:bg-gray-700"
                >
                  <BsSubstack className="w-4 h-4" />
                  All Sub Category
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/all-level-image"
                  className="flex items-center p-2 gap-4 rounded-2xl hover:bg-gray-700"
                >
                  <SiLevelsdotfyi className="w-5 h-5" />
                  All Level Images
                </Link>
              </li> */}
              <li>
                <Link
                  to="/all-products"
                  className="flex items-center p-2 gap-4 rounded-2xl hover:bg-gray-700"
                >
                  <GiFalloutShelter className="w-5 h-5" />
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/manage-review"
                  className="flex items-center p-2 gap-4 rounded-2xl hover:bg-gray-700"
                >
                  <CiImageOn className="w-5 h-5" />
                  Manage Review
                </Link>
              </li>
              <li>
                <Link
                  to="/manage-coupons"
                  className="flex items-center p-2 gap-4 rounded-2xl hover:bg-gray-700"
                >
                  <MdDiscount className="w-5 h-5" />
                  Manage Coupons
                </Link>
              </li>
              <li>
                <Link
                  to="/all-users"
                  className="flex items-center p-2 gap-4 rounded-2xl hover:bg-gray-700"
                >
                  <FaUsers className="w-5 h-5" />
                  All Users
                </Link>
              </li>
              <li>
                <Link
                  to="/all-inquiries"
                  className="flex items-center p-2 gap-4 rounded-2xl hover:bg-gray-700"
                >
                  <LuMessageCircleMore className="w-5 h-5" />
                  All Inquiries
                </Link>
              </li>
              <button onClick={logout} className="flex cursor-pointer items-center p-2 gap-4 bg-yellow-300 text-black rounded-2xl "><RiLogoutCircleLine className="w-5 h-5" /> Lougout</button>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1  p-8 md:ml-64 w-full max-md:mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
