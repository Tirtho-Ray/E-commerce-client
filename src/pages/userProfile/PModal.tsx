/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm } from "react-hook-form";
import { useUpdateMe } from "../../hooks/queries/useMe";
import toast, { Toaster } from "react-hot-toast";
import type { TProfile } from "../../services/profile";

type Props = {
    user: any;
    onClose: () => void;
};

const ProfileEditModal: React.FC<Props> = ({ user, onClose }) => {
    const { mutate: updateProfile } = useUpdateMe();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TProfile>({
        defaultValues: {
            name: user?.name || "",
            mobileNumber: user?.mobileNumber || "",
            addresses: user?.addresses?.[0] || {
                street: "",
                city: "",
                state: "",
                postalCode: "",
                country: "",
            },
        },
    });

    const onSubmit = (data: TProfile) => {
        console.log("🚀 Form submitted:", data);

        const formData = {
            ...data,
            profilePhoto: (data as any).profilePhoto?.[0] || null,
        };

        updateProfile(formData, {
            onSuccess: () => {
                toast.success("✅ Profile updated successfully!");
                setTimeout(() => onClose(), 500);
            },
            onError: (error: any) => {
                toast.error("❌ Update failed! Try again.");
                console.error("Update failed:", error);
            },
        });
    };

    return (
        <>
            <Toaster position="top-right" />



            <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-40">
                <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    >
                        ✕
                    </button>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        Edit Profile
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                {...register("name")}
                                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Mobile Number
                            </label>
                            <input
                                {...register("mobileNumber")}
                                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            {errors.mobileNumber && (
                                <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>
                            )}
                        </div>

                        {/* Address Fields */}
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                {...register("addresses.street")}
                                placeholder="Street"
                                className="p-2 border rounded-lg"
                            />
                            <input
                                {...register("addresses.city")}
                                placeholder="City"
                                className="p-2 border rounded-lg"
                            />
                            <input
                                {...register("addresses.state")}
                                placeholder="State"
                                className="p-2 border rounded-lg"
                            />
                            <input
                                {...register("addresses.postalCode")}
                                placeholder="Postal Code"
                                className="p-2 border rounded-lg"
                            />
                            <input
                                {...register("addresses.country")}
                                placeholder="Country"
                                className="p-2 border rounded-lg col-span-2"
                            />
                        </div>

                        {/* Profile Photo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Profile Photo
                            </label>
                            <input
                                type="file"
                                {...register("profilePhoto")}
                                className="w-full mt-1"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            // disabled={isLoading}
                            className="w-full bg-blue-600 text-white py-2.5 rounded-lg mt-3 hover:bg-blue-700 transition"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProfileEditModal;
