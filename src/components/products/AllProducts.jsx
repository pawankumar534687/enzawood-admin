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
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const getallproduct = async () => {
    const response = await axiosInstance.get(
      `/all-product?page=${page}&limit=10`,
    );
    localStorage.setItem("product", response.data.length);
    setallproduct(response.data.allprod);
    setTotalPage(response.data.totalpage);
    console.log(response.data.allprod);
  };

  useEffect(() => {
    getallproduct();
  }, [page]);

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
        const response = await axiosInstance.delete(`/product-delete/${id}`);

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
                  {(page - 1) * 10 + index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.productName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={item.variants[0]?.images[0].url}
                    alt={item.productName}
                    loading="lazy"
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
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-1 text-sm border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPage }, (_, i) => i + 1)
            .filter(
              (p) =>
                p === 1 || p === totalPage || (p >= page - 1 && p <= page + 1),
            )
            .map((p, index, arr) => (
              <React.Fragment key={p}>
                {index > 0 && p - arr[index - 1] > 1 && (
                  <span className="px-2 text-gray-500">...</span>
                )}

                <button
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 text-sm border rounded-md transition
            ${
              page === p
                ? "bg-fuchsia-600 text-white border-fuchsia-600"
                : "bg-white hover:bg-gray-100"
            }`}
                >
                  {p}
                </button>
              </React.Fragment>
            ))}

          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
            className="px-4 py-1 text-sm border rounded-md bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
