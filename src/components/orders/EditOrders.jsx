import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
const EditOrders = () => {
  const { id } = useParams();
  const [orderdetails, setOrderdetails] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/order-details/${id}`);
        console.log(response.data);
        setOrderdetails(response.data);
        setOrderStatus(response.data.Orderstatus);
        setPaymentStatus(response.data.paymentStatus);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (id) fetchOrderDetails();
  }, [id]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const response = await axiosInstance.put(`/update-order/${id}`, {
        Orderstatus: orderStatus,
        paymentStatus: paymentStatus,
      });
      navigate("/manage-orders");
      setUpdating(false);
      toast.success(response.data.message);
    } catch (err) {
      toast.error("Update failed:", err);
      setUpdating(false);
    }
  };
  if (!orderdetails || !orderdetails.customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold pb-6 text-fuchsia-700 underline">
          Order Details
        </h1>
        <Link
          to="/manage-orders"
          className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-700 text-white rounded-xl shadow-md hover:bg-fuchsia-800 transition"
        >
          ← Back
        </Link>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-6">
        {/* Left */}
        <div className="bg-white p-5 rounded-xl border border-gray-300 shadow-sm space-y-3">
          <h2 className="text-xl font-semibold text-fuchsia-600">
            Customer Info
          </h2>
          <p>
            <strong>Name:</strong> {orderdetails.customer.name}
          </p>
          <p>
            <strong>Email:</strong> {orderdetails.customer.email}
          </p>
          <p>
            <strong>Phone:</strong> {orderdetails.customer.phone}
          </p>
          <p>
            <strong>Address:</strong> {orderdetails.customer.address},{" "}
            {orderdetails.customer.city}, {orderdetails.customer.state},{" "}
            {orderdetails.customer.country} - {orderdetails.customer.pincode}
          </p>

          <h2 className="text-xl font-semibold pt-4 text-fuchsia-600">
            Order Info
          </h2>
          <p>
            <strong>Order ID:</strong> {orderdetails.orderId}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(orderdetails.createdAt).toLocaleString()}
          </p>
          <div className="space-y-2">
            <div className="flex gap-6">
              <p>
                <strong>Order Status:</strong>
              </p>
              <select
                className="w-[50%] p-2 border rounded bg-slate-100"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value="placed">Placed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex gap-6">
              <p>
                <strong>Payment Status:</strong>
              </p>
              <select
                className="w-[50%]  p-2 border rounded bg-slate-100"
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            <button
              onClick={handleUpdate}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              disabled={updating}
            >
              Update Order
            </button>
          </div>
        </div>

        {/* Right - Items */}
        <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-indigo-700">
            🛒 Ordered Items
          </h2>
          <div className="flex flex-col items-start gap-4">
            {orderdetails.items.map((item, index) => (
              <div
                key={item._id || index}
                className="w-full border rounded-xl p-4 bg-slate-50 hover:shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item?.image}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded border"
                  />
                 
                  <div className="text-sm text-slate-700 space-y-1">
                    <p className="font-semibold text-base line-clamp-2">
                      {item.productName}
                    </p>
                    <p>Qty: {item.quantity}</p>
                    <div className="flex gap-4 text-red-600">
<p>color : </p>
                     <p className="text-xl">{item?.colorName}</p>
                    </div>
                    <p>Price: ₹{item.price}</p>
                    <p className="text-green-600 font-medium">
                      Total: ₹{item.quantity * item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 bg-white p-5 rounded-xl border shadow-sm max-w-xl mx-auto space-y-2">
        <h2 className="text-xl font-semibold text-fuchsia-600">
          Order Summary
        </h2>

        <p>
          <strong>Item Total:</strong> ₹{orderdetails.totalAmount}
        </p>
        <p>
          <strong>Coupon Applied:</strong> {orderdetails.coupon?.code} (₹
          {orderdetails.coupon?.discount})
        </p>
        <p className="text-lg font-bold text-green-600">
          Final Amount Paid: ₹{orderdetails.finalAmount}
        </p>
      </div>
    </div>
  );
};

export default EditOrders;
