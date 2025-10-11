import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import Swal from "sweetalert2";
import axiosInstance from "../utils/axiosInstance";
const ManageOrders = () => {
  const [allorders, setallorders] = useState([]);

  const getallorders = async (req, res) => {
    
    const response = await axiosInstance.get(
      "/get-all-orders",
      
    );

    localStorage.setItem("order", response.data.length)

    setallorders(response.data);
  };

  useEffect(() => {
    getallorders();
  }, []);

  const deleteorder = async (id) => {
    try {
      

      const response = await axiosInstance.delete(
        `/delete-order/${id}`,
        
      );
      getallorders();
    } catch (error) {
      console.log(error);
    }
  };

   const handleDelete = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteorder(id);
        }
      });
    };



  return (
    <div>
      <div className="flex justify-between ">
        <h1 className="text-fuchsia-700 underline text-3xl font-bold">
          All Orders
        </h1>
      </div>
      <div className="mt-12   rounded shadow max-h-[450px]">
        <table className="min-w-[1000px] table-auto border-collapse border border-gray-300 w-full">
          <thead className="text-white bg-fuchsia-600 h-12 sticky top-0 z-10">
            <tr className="">
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-center whitespace-nowrap">
                S.No
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Order ID
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Items
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Final Price
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Order Status
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Payment Mode
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Payment Status
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Order Date
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Order Deatails
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {allorders.map((item, index) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                 <Link className=" text-blue-600 underline" to={`/edit-order/${item._id}`}> {item.orderId}</Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.items.length}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.finalAmount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.Orderstatus}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.customer.paymentMethod}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.paymentStatus}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(item.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link

                
                    className="bg-green-500 hover:bg-green-300  flex justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                    to={`/edit-order/${item._id}`}
                  >
                    <span>order details</span> <TbEdit className="w-4 h-4" />
                  </Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-600 hover:bg-red-400 px-2 flex justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    <span>delete</span> <MdDeleteForever className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
