import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axiosInstance from "../utils/axiosInstance";
const AllSubCategory = () => {
  const [allsubcategory, setallsubcategory] = useState([]);

  const getsubcategory = async () => {
    
    const response = await axiosInstance.get(
      "/all-subcategory",
      
    );
     localStorage.setItem("subcategory", response.data.length)
    setallsubcategory(response.data);
  };

  useEffect(() => {
    getsubcategory();
  }, []);

  const deletesubcategory = async (id) => {
   
    try {
      const response = await axiosInstance.delete(
        `/subcategory-delete/${id}`);
      getsubcategory();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: response.data.message,
        timer: 2000,
        showConfirmButton: false,
      });
      
    } catch (error) {
      toast.error(response.data.message);
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
        deletesubcategory(id);
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-fuchsia-600 underline">
          All Sub Category
        </h1>
        <Link
          className="font-bold bg-fuchsia-600 rounded-2xl px-2 py-1 text-white"
          to="/create-sub-category"
        >
          Add New
        </Link>
      </div>
      <div className="mt-12 overflow-x-auto  rounded shadow max-h-[450px]">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead className="text-white bg-fuchsia-600 h-12 sticky top-0 z-10">
            <tr className="">
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-center whitespace-nowrap">
                S.No
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Sub Category
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Sub Category id
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Category
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Image
              </th>

              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Edit
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {allsubcategory.map((item, index) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.subcategory}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item._id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.category?.category}
                </td>
                <td className="border border-gray-300 p-2">
                  <img
                    className="w-12 h-12"
                    src={item.image.url}
                    alt={item.subcategory}
                  />
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    className="bg-green-500 hover:bg-green-300 px-2 flex justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                    to={`/get-sub-category-form/${item._id}`}
                  >
                    <span>Edit</span> <TbEdit className="w-4 h-4" />
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

export default AllSubCategory;
