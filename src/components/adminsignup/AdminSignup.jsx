import { useForm } from "react-hook-form";

import { ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
const AdminSignup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
  defaultValues: {
    email: "",
    password: "",
  }
});

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/admin", data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      reset();
      navigate("/");
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
        <div className="flex items-center justify-center mb-6">
          <ShieldCheck className="w-8 h-8 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-blue-700">Admin Signup</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Email Address"
               autoComplete="off"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Password"
               autoComplete="off"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center cursor-pointer items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl font-semibold hover:opacity-90 transition shadow-md"
          >
            Register Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
