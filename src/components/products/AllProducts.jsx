import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axiosInstance from "../utils/axiosInstance";
const AllProducts = () => {
  const [allproduct, setallproduct] = useState([]);

  const getallproduct = async () => {
    const response = await axiosInstance.get("/all-product");
    localStorage.setItem("product", response.data.length);
    setallproduct(response.data);
  };

  useEffect(() => {
    getallproduct();
  }, []);

  const deleteproduct = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        
        const response = await axiosInstance.delete(
          `/product-delete/${id}`,
         
        );

        await getallproduct();
        toast.success(response.data.message);

        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-fuchsia-600 underline">
          All Products
        </h1>
        <Link
          className="font-bold bg-fuchsia-600 rounded-2xl px-2 py-1 text-white"
          to="/create-product"
        >
          Add New
        </Link>
      </div>

      <div className="mt-12 overflow-x-auto  rounded shadow max-h-[450px]">
        <table className="min-w-full border-collapse">
          <thead className="text-white bg-fuchsia-600 h-12 sticky top-0 z-10">
            <tr>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-center whitespace-nowrap">
                S.No
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Title
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Image
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Price
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Discount
              </th>
              <th className="border resize-x overflow-auto border-gray-300 px-4 py-2 text-left whitespace-nowrap">
                Final Price
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
            {allproduct.map((item, index) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.productName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={item.images[0].url}
                    alt={item.productName}
                    className="h-16 w-16 object-cover"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ₹{item.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.discount}%
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ₹{item.finalprice}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link
                    className="bg-green-500 hover:bg-green-300 px-2 flex justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                    to={`/edit-product/${item._id}`}
                  >
                    <span>Edit</span> <TbEdit className="w-4 h-4" />
                  </Link>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-600 hover:bg-red-400 px-2 flex justify-center items-center py-1 cursor-pointer rounded-2xl text-white text-sm"
                    onClick={() => deleteproduct(item._id)}
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

export default AllProducts;
