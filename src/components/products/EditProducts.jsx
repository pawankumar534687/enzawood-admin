import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const EditProducts = () => {
  const [allsubcategory, setAllSubcategory] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([{ colorName: "", images: [] }]);
  const [loading, setLoading] = useState(false);
  const [removedImagesArray, setRemovedImagesArray] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const price = watch("price");
  const discount = watch("discount");

  // Calculate final price
  useEffect(() => {
    if (price && discount >= 0) {
      const discountedPrice = price - (price * discount) / 100;
      setValue("finalprice", Math.round(discountedPrice));
    }
  }, [price, discount, setValue]);

  // Fetch categories, subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axiosInstance.get("/all-category");
      setCategorys(res.data);
    };
    const fetchSubCategories = async () => {
      const res = await axiosInstance.get("/all-subcategory");
      setAllSubcategory(res.data);
    };
    fetchCategories();
    fetchSubCategories();
  }, []);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axiosInstance.get(`/edit-product-data/${id}`);
      console.log("Product variants:", res.data.variants);
      setProduct(res.data);

      // Set normal fields
      const fields = [
        "productName",
        "description",
        "productinformation",
        "material",
        "seatingCapacity",
        "size",
        "brand",
        "style",
        "category",
        "subCategory",
        "price",
        "discount",
        "finalprice",
      ];
      fields.forEach((f) => setValue(f, res.data[f] || ""));

      // Set variants from backend
      if (res.data.variants && res.data.variants.length > 0) {
        setVariants(
          res.data.variants.map((v) => ({
            colorName: v.colorName,
            images: v.images.map((img) => ({
              url: img.url,
              public_id: img.public_id || "",
              local: false,
            })),
          }))
        );
      } else {
        setVariants([{ colorName: "", images: [] }]);
      }
    };
    fetchProduct();
  }, [id, setValue]);

  const handleVariantChange = (index, key, value) => {
    const updated = [...variants];
    updated[index][key] = value;
    setVariants(updated);
  };

  const handleVariantImages = (index, files) => {
    const updated = [...variants];
    const previews = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      local: true,
    }));
    updated[index].images = [
      ...updated[index].images.filter((img) => !img.local),
      ...previews,
    ];
    setVariants(updated);
  };

  const addVariant = () =>
    setVariants([...variants, { colorName: "", images: [] }]);
  const removeVariant = (index) => {
    const variantToRemove = variants[index];

    // 🧹 collect all uploaded images (with public_id)
    const cloudImages = variantToRemove.images
      .filter((img) => !img.local && img.public_id)
      .map((img) => ({ public_id: img.public_id }));

    // add them to removedImagesArray
    setRemovedImagesArray((prev) => [...prev, ...cloudImages]);

    // remove variant from state
    setVariants(variants.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Append normal fields
      Object.keys(data).forEach((key) => {
        if (!["images"].includes(key)) formData.append(key, data[key]);
      });

      // Append variant images
      variants.forEach((variant) => {
        if (!variant.colorName) return;

        // 🟢 1️⃣ Upload new images
        variant.images
          .filter((img) => img.local)
          .forEach((img) => {
            formData.append(`variant_${variant.colorName}`, img.file);
          });

        // 🟢 2️⃣ Keep old images together by color
        const oldImgs = variant.images
          .filter((img) => !img.local)
          .map((img, idx) => ({
            url: img.url,
            public_id: img.public_id || img.url.split("/").pop() + "_" + idx,
          }));

        if (oldImgs.length > 0) {
          formData.append(
            "oldImages[]",
            JSON.stringify({
              colorName: variant.colorName,
              images: oldImgs,
            })
          );
        }
      });

      formData.append("removedImages", JSON.stringify(removedImagesArray));
      await axiosInstance.put(`/edit-product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product updated successfully!");
      navigate("/all-products");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 pb-2">
        <h1 className="text-3xl underline font-bold text-fuchsia-700">
          Edit Product
        </h1>
        <Link
          to="/all-products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-700 text-white rounded-xl hover:bg-fuchsia-800 transition"
        >
          ← Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto"
        encType="multipart/form-data"
      >
        {/* Category & Subcategory */}
        <div>
          <label className="font-medium text-gray-700">Category</label>
          <select
            {...register("category", { required: true })}
            className="border px-4 py-2 rounded-xl w-full border-fuchsia-500"
          >
            <option value="">Select Category</option>
            {categorys.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-medium text-gray-700">Sub Category</label>
          <select
            {...register("subCategory", { required: true })}
            className="border px-4 py-2 rounded-xl w-full border-fuchsia-500"
          >
            <option value="">Select Sub Category</option>
            {allsubcategory.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.subcategory}
              </option>
            ))}
          </select>
        </div>

        {/* Product fields */}
        {[
          "productName",
          "description",
          "productinformation",
          "material",
          "seatingCapacity",
          "size",
          "brand",
          "style",
          "price",
          "discount",
          "finalprice",
        ].map((f) => (
          <div key={f}>
            <label className="block font-medium text-gray-700">
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </label>
            {f === "description" || f === "productinformation" ? (
              <textarea
                {...register(f)}
                className="border px-4 py-2 rounded-xl w-full border-fuchsia-500"
              />
            ) : (
              <input
                {...register(f)}
                type={
                  ["price", "discount", "finalprice"].includes(f)
                    ? "number"
                    : "text"
                }
                readOnly={f === "finalprice"}
                className="border px-4 py-2 rounded-xl w-full border-fuchsia-500"
              />
            )}
          </div>
        ))}

        {/* Variants Section */}
        <div className="col-span-full border p-4 rounded-xl border-fuchsia-300">
          <h2 className="text-lg font-semibold mb-2">
            Variants (Colors & Images)
          </h2>
          {variants.map((variant, index) => (
            <div
              key={index}
              className="mb-4 border p-2 rounded-xl border-gray-300"
            >
              <input
                type="text"
                placeholder="Color Name"
                value={variant.colorName}
                onChange={(e) =>
                  handleVariantChange(index, "colorName", e.target.value)
                }
                className="border px-2 py-1 w-full mb-2 rounded"
              />
              <input
                type="file"
                multiple
                onChange={(e) => handleVariantImages(index, e.target.files)}
                className="mb-2"
              />
              <div className="flex gap-2 flex-wrap">
                {variant.images.map((img, i) => (
                  <img
                    key={i}
                    src={img.url}
                    alt="preview"
                    className="w-16 h-16 object-cover border rounded"
                  />
                ))}
              </div>
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="mt-2 px-2 py-1 bg-red-500 text-white rounded"
                >
                  Remove Variant
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addVariant}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Add Variant
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-fuchsia-700 w-full h-12 mt-4 text-white rounded hover:bg-fuchsia-800 flex items-center justify-center gap-2 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProducts;
