import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axiosInstance from "../utils/axiosInstance";
const ManageReview = () => {
  const [allreview, setallreview] = useState([]);

  const getallreview = async () => {
   
    const response = await axiosInstance.get("/all-review");
    localStorage.setItem("review", response.data.length);
    setallreview(response.data);
  };

  useEffect(() => {
    getallreview();
  }, []);

  const deletereview = async (id) => {
    
    try {
      const response = await axiosInstance.delete(
        `/delete-review/${id}`
        
      );
      getallreview();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });

    } catch (error) {
      toast.error(error);
    }
  };

  const handledelete = (id) => {
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
        deletereview(id);
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between ">
        <h1 className="text-fuchsia-700 underline text-3xl font-bold">
          Manage Reviews
        </h1>
       
      </div>
      <div className="mt-12 overflow-x-auto  rounded shadow max-h-[450px]">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead className="text-white bg-fuchsia-600 h-12 sticky top-0 z-10">
            <tr className="">
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-center whitespace-nowrap">
                S.No
              </th>

              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Text
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Reviw Image
              </th>

              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Stars
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {allreview.map((item, index) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.text}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <img
                    className="w-16 h-16"
                    src={item.image.url}
                    alt={item.title}
                  />
                </td>

                <td className="border border-gray-300 px-4 py-2">
                 {item.rating} 🌟
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-600 hover:bg-red-400 px-2 flex justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                    onClick={() => handledelete(item._id)}
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

export default ManageReview;
