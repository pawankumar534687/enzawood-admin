import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "./components/DashboardHome";
import ManageOrders from "./components/orders/ManageOrders";
import AllCategory from "./components/category/AllCategory";
import AllSubCategory from "./components/subcategory/AllSubCategory";
import AllProducts from "./components/products/AllProducts";
import ManageReview from "./components/review/ManageReview";
import ManageCupans from "./components/coupons/ManageCupans";
import AllUsers from "./components/AllUsers";
import AllInquiries from "./components/AllInquiries";
import Dashboard from "./components/Dashboard";
import CreateCoupon from "./components/coupons/CreateCoupon";
import EditCoupon from "./components/coupons/EditCoupon";
import CreateCategory from "./components/category/CreateCategory";
import EditCategory from "./components/category/EditCategory";
import CreateSubCategory from "./components/subcategory/CreateSubCategory";
import EditSubCategory from "./components/subcategory/EditSubCategory";
import CreateProduct from "./components/products/CreateProduct";
import EditProducts from "./components/products/EditProducts";
import AdminSignup from "./components/adminsignup/AdminSignup";
import ProtectedRoutes from "./components/protectedroute/ProtectedRoutes";
import EditOrders from "./components/orders/EditOrders";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}>
          <Route index element={<DashboardHome />} />
          <Route path="/manage-orders" element={<ManageOrders />} />
          <Route path="/all-category" element={<AllCategory />} />
          <Route path="/all-sub-category" element={<AllSubCategory />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/manage-review" element={<ManageReview />} />
          <Route path="/manage-coupons" element={<ManageCupans />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/all-inquiries" element={<AllInquiries />} />
          <Route path="/create-coupon" element={<CreateCoupon />} />
          <Route path="/edit-coupon/:id" element={<EditCoupon />} />
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/edit-category/:id" element={<EditCategory />} />
          <Route path="/create-sub-category" element={<CreateSubCategory />} />
          <Route
            path="/get-sub-category-form/:id"
            element={<EditSubCategory />}
          />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/edit-product/:id" element={<EditProducts />} />
          <Route path="/edit-order/:id" element={<EditOrders />} />
        </Route>
        <Route path="/admin" element={<AdminSignup />} />
      </Routes>
    </div>
  );
}

export default App;
