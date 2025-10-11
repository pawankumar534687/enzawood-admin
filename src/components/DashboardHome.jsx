import React from "react";
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
import { Link } from "react-router-dom";

const Dashboard = () => {
  const order = localStorage.getItem("order");
  const product = localStorage.getItem("product");
  const category = localStorage.getItem("category");
  const subcategory = localStorage.getItem("subcategory");
  const coupon = localStorage.getItem("coupon");
  const inquirie = localStorage.getItem("inquiries");
  const users = localStorage.getItem("users");
  const review = localStorage.getItem("review");

  return (
    <div>
      <div className="flex flex-col justify-center items-center ">
        <h1 className="text-5xl font-bold px-6">
          Welcome to EnzaWood Admin Panel
        </h1>
        <p className="pt-6 text-xl text-gray-500 font-semibold">
          Manage your FURNITURE data from here!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-12 px-6">
        <Link
          to="/manage-orders"
          className="bg-white py-4 h-55 border border-neutral-300 m-4 rounded-xl flex flex-col justify-start items-center text-center px-16 transform transition duration-300 hover:-translate-y-4 hover:shadow-lg"
        >
          <div className="flex flex-col items-center text-center px-2">
            <FaTruck className="w-11 mt-3 h-11 text-pink-500" />
            <h1 className="mt-2 pb-2 font-bold text-lg text-gray-900 flex gap-2">
              <span>Manage</span> <span>Order</span>
            </h1>
            <p className="text-[12px] text-gray-600 leading-tight max-w-[160px]">
              Track and manage your customer order
            </p>
            <h1 className="text-lg font-bold mt-2">{order} Orders</h1>
          </div>
        </Link>
        {/* <Link
          to="/manage-review"
          className="bg-white py-4 h-55 border border-neutral-300 m-4 rounded-xl flex flex-col justify-start items-center text-center px-16 transform transition duration-300 hover:-translate-y-4 hover:shadow-lg"
        >
          <div className="flex flex-col items-center text-center px-2">
            <CiImageOn className="w-11 mt-3 h-11 text-pink-500" />
            <h1 className="mt-2 pb-2 font-bold text-lg text-gray-900 flex gap-2">
              <span>Manage</span> <span>Banners</span>
            </h1>
            <p className="text-[12px] text-gray-600 leading-tight max-w-[160px]">
              Update your website banner
            </p>
            <h1 className="text-lg font-bold mt-2">{review} Banners</h1>
          </div>
        </Link> */}
        <Link
          to="/all-category"
          className="bg-white py-4 h-55 border border-neutral-300 m-4 rounded-xl flex flex-col justify-start items-center text-center px-16 transform transition duration-300 hover:-translate-y-4 hover:shadow-lg"
        >
          <div className="flex flex-col items-center text-center px-2">
            <MdCategory className="w-12 mt-3 h-12 text-pink-500" />
            <h1 className="mt-2 pb-2 font-bold text-lg text-gray-900 flex gap-2">
              <span>Manage</span> <span>Category</span>
            </h1>
            <p className="text-[12px] text-gray-600 leading-tight max-w-[160px]">
              Add, update and remove category
            </p>
            <h1 className="text-lg font-bold mt-2">{category} Categorys</h1>
          </div>
        </Link>
        <Link
          to="/all-sub-category"
          className="bg-white py-4 h-55 border border-neutral-300 m-4 rounded-xl flex flex-col justify-start items-center text-center px-16 transform transition duration-300 hover:-translate-y-4 hover:shadow-lg"
        >
          <div className="flex flex-col items-center text-center px-2">
            <BsSubstack className="w-10 mt-3 h-10 text-pink-500" />
            <h1 className="mt-2 pb-2 font-bold text-lg text-gray-900  gap-2">
              <div className="flex gap-2">
                {" "}
                <span>Manage</span> <span>Sub</span>
              </div>
              <span>Category</span>
            </h1>
            <p className="text-[12px] text-gray-600 leading-tight max-w-[160px]">
              Manage sub category of your products
            </p>
            <h1 className="text-lg flex gap-1 font-bold mt-2">
             <h1>{subcategory}</h1>  <span>SubCategorys</span>
            </h1>
          </div>
        </Link>
        <Link
          to="/all-inquiries"
          className="bg-white py-4 h-55 border border-neutral-300 m-4 rounded-xl flex flex-col justify-start items-center text-center px-16 transform transition duration-300 hover:-translate-y-4 hover:shadow-lg"
        >
          <div className="flex flex-col items-center text-center px-2">
            <LuMessageCircleMore className="w-11 mt-3 h-11 text-pink-500" />
            <h1 className="mt-2 pb-2 font-bold text-lg text-gray-900 flex gap-2">
              <span>Manage</span> <span>Inquiries</span>
            </h1>
            <p className="text-[12px] text-gray-600 leading-tight max-w-[160px]">
              Add, update and remove inquiries
            </p>
            <h1 className="text-lg font-bold mt-2">{inquirie} Inquiries</h1>
          </div>
        </Link>
        <Link
          to="/all-products"
          className="bg-white py-4 h-55 border border-neutral-300 m-4 rounded-xl flex flex-col justify-start items-center text-center px-16 transform transition duration-300 hover:-translate-y-4 hover:shadow-lg"
        >
          <div className="flex flex-col items-center text-center px-2">
            <GiFalloutShelter className="w-11 mt-3 h-11 text-pink-500" />
            <h1 className="mt-2 pb-2 font-bold text-lg text-gray-900 flex gap-2">
              <span>Manage</span> <span>Products</span>
            </h1>
            <p className="text-[12px] text-gray-600 leading-tight max-w-[160px]">
              Add, update and remove products
            </p>
            <h1 className="text-lg font-bold mt-2">{product} Products</h1>
          </div>
        </Link>
        <Link
          to="/all-users"
          className="bg-white py-4 h-55 border border-neutral-300 m-4 rounded-xl flex flex-col justify-start items-center text-center px-16 transform transition duration-300 hover:-translate-y-4 hover:shadow-lg"
        >
          <div className="flex flex-col items-center text-center px-2">
            <FaUsers className="w-11 mt-3 h-11 text-pink-500" />
            <h1 className="mt-2 pb-2 font-bold text-lg text-gray-900 flex gap-2">
              <span>All</span> <span>Users</span>
            </h1>
            <p className="text-[12px] text-gray-600 leading-tight max-w-[160px]">
              View and Manage users
            </p>
            <h1 className="text-lg font-bold mt-2">{users} Users</h1>
          </div>
        </Link>
        <Link
          to="/manage-coupons"
          className="bg-white py-4 h-55 border border-neutral-300 m-4 rounded-xl flex flex-col justify-start items-center text-center px-16 transform transition duration-300 hover:-translate-y-4 hover:shadow-lg"
        >
          <div className="flex flex-col items-center text-center px-2">
            <MdDiscount className="w-11 mt-3 h-11 text-pink-500" />
            <h1 className="mt-2 pb-2 font-bold text-lg text-gray-900 flex gap-2">
              <span>Manage</span> <span>Coupons</span>
            </h1>
            <p className="text-[12px] text-gray-600 leading-tight max-w-[160px]">
              View and manage cooupons
            </p>
            <h1 className="text-lg font-bold mt-2">{coupon} Coupons</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
