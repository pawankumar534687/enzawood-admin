import React, { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axiosInstance from "./utils/axiosInstance";
const AllMessages = () => {
  const [alldata, setalldata] = useState([]);

  const getmessage = async () => {
    const response = await axiosInstance.get("/all-Inquiry");
    localStorage.setItem("inquiries", response.data.length);
    setalldata(response.data);
  };

  const deletemessage = async (id) => {
    try {
      const response = await axios.delete(
        `/delete-inquiry/${id}`);

      getmessage();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getmessage();
  }, []);

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
        deletemessage(id);
      }
    });
  };

  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl text-fuchsia-700 underline">
          All Inquiries
        </h1>
      </div>
      <div className="mt-12 rounded shadow">
        <div className="mt-12 rounded shadow max-h-[450px] overflow-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead className="text-white bg-fuchsia-600 h-12 sticky top-0 z-10">
              <tr>
                <th className="border border-gray-300 resize-x  overflow-auto px-4 py-2 text-center whitespace-nowrap">
                  S.No
                </th>
                <th className="border border-gray-300 resize-x overflow-auto px-4 py-2 text-left whitespace-nowrap">
                  Name
                </th>
                <th className="border border-gray-300 resize-x overflow-auto px-4 py-2 text-left whitespace-nowrap">
                  Email
                </th>
                <th className="border border-gray-300 resize-x overflow-auto px-4 py-2 text-left whitespace-nowrap">
                  Phone
                </th>
                <th className="border border-gray-300 resize-x overflow-auto px-4 py-2 text-left whitespace-nowrap">
                  Message
                </th>
                <th className="border border-gray-300 resize-x overflow-auto px-4 py-2 text-left whitespace-nowrap">
                  Date
                </th>
                <th className="border border-gray-300 resize-x overflow-auto px-4 py-2 text-left whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {alldata.map((item, index) => (
                <tr key={item._id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.message}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-red-600 px-2 flex justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      <span>delete</span>
                      <MdDeleteForever className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllMessages;
