import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axiosInstance from "../utils/axiosInstance";
const AllCategory = () => {
  const [allcategory, setallcategory] = useState([]);

  const getallcategory = async () => {
    try {
      const response = await axiosInstance.get(
        "/all-category"
      );
      localStorage.setItem("category", response.data.length);
      setallcategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletecategory = async (id) => {
   
    try {
      const response = await axiosInstance.delete(
        `/delete-category/${id}`
        
      );
      getallcategory();

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: response.data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletecategory(id);
      }
    });
  };

  useEffect(() => {
    getallcategory();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-3xl text-fuchsia-700 font-bold underline">
          All Category
        </h1>
        <Link
          to="/create-category"
          className="bg-fuchsia-700 text-white flex items-center px-2 rounded-2xl font-bold"
        >
          Add New
        </Link>
      </div>

      <div className="mt-12 overflow-x-auto rounded shadow max-h-[450px]">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead className="text-white bg-fuchsia-600 h-12 sticky top-0 z-10">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">
                S.No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
             
              <th className="border border-gray-300 px-4 py-2 text-left">
                Category id
              </th>
             
              <th className="border border-gray-300 px-4 py-2 text-left">
                Image
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Edit
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {allcategory.map((item, index) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.category}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item._id}
                </td>
                

                <td className="border border-gray-300 px-4 py-2">
                  <img className="w-24 h-12" src={item.image?.url} alt="" />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <Link
                    to={`/edit-category/${item._id}`}
                    className="inline-flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-2 py-1 rounded"
                  >
                    <TbEdit className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-600 hover:bg-red-400 px-2 flex justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    <span>delete</span>{" "}
                    <MdDeleteForever className="w-4 h-4 ml-1" />
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

export default AllCategory;
