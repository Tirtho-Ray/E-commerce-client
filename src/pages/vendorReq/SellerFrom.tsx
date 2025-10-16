/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/forms/SellerForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VendorValidation, type TVendor } from "../../utils/validation/seller.validation";
import { useVendorReq } from "../../hooks/mutations/useVendor";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function SellerForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TVendor>({
        resolver: zodResolver(VendorValidation),
    });
    const { mutate } = useVendorReq();
    const navigate = useNavigate()

    const onSubmit = (fromData: TVendor) => {
        console.log("✅ Submitted Data:", fromData);
        mutate(fromData, {
            onSuccess: (data: any) => {
                console.log("fromdata", fromData)
                console.log("data", data)
                if (data.success) {
                    toast.success(data.message)
                }
                navigate("/request-seller-congratulation")

            },
            onError: (err: any) => {
                toast.error(err.message)
            }
        })

    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mx-auto p-6 bg-white shadow-md rounded-2xl space-y-4"
        >
            <h1 className="text-2xl font-bold mb-4 text-center">Fill up the Form</h1>
            <h2 className="text-2xl font-bold mb-4">Your Info</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {/* Basic Info */}
                <input {...register("shopName")} placeholder="Shop Name" className="border p-2 w-full rounded-md" />
                {errors.shopName && <p className="text-red-500">{errors.shopName.message}</p>}

                <input {...register("email")} placeholder="Email" className="border p-2 w-full rounded-md" />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <input {...register("phone")} placeholder="Phone" className="border p-2 w-full rounded-md" />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>

            {/* Address */}
            <h3 className="font-semibold mt-4">Address</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <input {...register("address.street")} placeholder="Street" className="border p-2 w-full rounded-md" />
                <input {...register("address.city")} placeholder="City" className="border p-2 w-full rounded-md" />
                <input {...register("address.state")} placeholder="State" className="border p-2 w-full rounded-md" />
                <input {...register("address.country")} placeholder="Country" className="border p-2 w-full rounded-md" />
                <input {...register("address.postalCode")} placeholder="Postal Code" className="border p-2 w-full rounded-md" />
            </div>

            {/* Bank Details */}
            <h3 className="font-semibold mt-4">Bank Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <input {...register("bankDetails.accountName")} placeholder="Account Number" className="border p-2 w-full rounded-md" />
                <input {...register("bankDetails.accountNumber")} placeholder="Account Holder Name" className="border p-2 w-full rounded-md" />
                <input {...register("bankDetails.bankName")} placeholder="Bank Name" className="border p-2 w-full rounded-md" />
                <input {...register("bankDetails.ifscCode")} placeholder="IFSC Code" className="border p-2 w-full rounded-md" />

            </div>
            {/* Documents */}
            <h3 className="font-semibold mt-4">Documents</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <input {...register("documents.nationalId")} placeholder="National ID" className="border p-2 w-full rounded-md" />
                <input {...register("documents.tradeLicense")} placeholder="Trade License" className="border p-2 w-full rounded-md" />
            </div>

            {/* Social Links */}
            <h3 className="font-semibold mt-4">Social Media Links</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <input {...register("socialLinks.facebook")} placeholder="Facebook URL" className="border p-2 w-full rounded-md" />
                {errors.socialLinks?.facebook && (
                    <p className="text-red-500">{errors.socialLinks.facebook.message}</p>
                )}

                <input {...register("socialLinks.instagram")} placeholder="Instagram URL" className="border p-2 w-full rounded-md" />
                {errors.socialLinks?.instagram && (
                    <p className="text-red-500">{errors.socialLinks.instagram.message}</p>
                )}

                <input {...register("socialLinks.twitter")} placeholder="Twitter URL" className="border p-2 w-full rounded-md" />
                {errors.socialLinks?.twitter && (
                    <p className="text-red-500">{errors.socialLinks.twitter.message}</p>
                )}
                <input {...register("socialLinks.linkedin")} placeholder="LinkedIn URL" className="border p-2 w-full rounded-md" />
                {errors.socialLinks?.linkedin && (
                    <p className="text-red-500">{errors.socialLinks.linkedin.message}</p>
                )}

            </div>
            {/* Extra Info */}
            <h3 className="font-semibold mt-4">Your Product Info</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <input {...register("logoImg")} placeholder="Logo URL" className="border p-2 w-full rounded-md" />
                <input {...register("bannerImg")} placeholder="Banner URL" className="border p-2 w-full rounded-md" />
                <input {...register("website")} placeholder="Website" className="border p-2 w-full rounded-md" />
            </div>
            <textarea {...register("description")} placeholder="Description" className="border p-2 w-full rounded-md" />

            <h3 className="font-semibold mt-4">You business Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <select {...register("businessType")} className="border p-2 w-full rounded-md">
                    <option value="">Select Business Type</option>
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                    <option value="reseller">Reseller</option>
                    <option value="manufacturer">Manufacturer</option>
                </select>

            </div>
            <h3 className="font-semibold mt-4">Product Category</h3>
            {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
     
                <select
                    {...register("productCategories")}
                    className="border p-2 w-full rounded-md"
                >
                    <option value="">Select a Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Home & Furniture">Home & Furniture</option>
                    <option value="Clothing & Fashion">Clothing & Fashion</option>
                    <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                    <option value="Sports & Fitness">Sports & Fitness</option>
                    <option value="Books & Stationery">Books & Stationery</option>
                    <option value="Toys & Games">Toys & Games</option>
                    <option value="Grocery & Essentials">Grocery & Essentials</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Jewelry & Accessories">Jewelry & Accessories</option>
                </select>
                {errors.productCategories && (
                    <p className="text-red-500 text-sm">{errors.productCategories.message}</p>
                )}
            </div> */}


            <input {...register("productCategories.0")} placeholder="Product Category" className="border p-2 w-full rounded-md" />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Submit
            </button>

            {/* Show validation errors */}
            {/* <pre className="bg-gray-100 text-xs p-2 rounded">{JSON.stringify(errors, null, 2)}</pre> */}
        </form>
    );
}
