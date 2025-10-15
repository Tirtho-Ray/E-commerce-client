import React from "react";
import { Link, useNavigate } from "react-router";
import InputField from "../../components/ui/forms/inputFields";
import { useForm } from "react-hook-form";
import type { TRegister } from "../../types/auth/register";
import { zodResolver } from '@hookform/resolvers/zod';
import { registerValidation } from "../../utils/validation/registerValidation";
import { useRegister } from "../../hooks/mutations/useAuth";



const Register: React.FC = () => {
    const navigate = useNavigate()
    const { mutate, isLoading, error } = useRegister();
    const { register, handleSubmit, formState: { errors } } = useForm<TRegister>({
        resolver: zodResolver(registerValidation),
    });


    const onSubmit = (formData: TRegister) => {
        mutate(formData, {
            onSuccess: (response) => {
                const userId = response?.data.userId
                // console.log("User ID:", response?.data?.userId);
                navigate("/verify-otp", { state: { userId } })
            },
            onError: (error) => {
                console.error("Registration failed:", error);
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white px-4 py-4">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 shadow-[0_0_25px_rgba(0,0,0,0.5)] space-y-6 transition-all duration-300">
                {/* Header */}
                <div className="text-center space-y-1">
                    <h2 className="text-sm md:text-md lg:text-xl  font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Create Your Account
                    </h2>
                </div>

                {/* Google Signup */}
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-gray-200 py-2 rounded-xl text-sm sm:text-base transition-all duration-300 border border-white/20 backdrop-blur-sm"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-3 h-3 sm:w-6 sm:h-6"
                    />
                    <p className="text-sm"> Continue with Google</p>
                </button>

                {/* Divider */}
                <div className="flex items-center text-xs sm:text-sm text-gray-400 gap-2">
                    <div className="flex-grow h-px bg-white/20" />
                    <span>or</span>
                    <div className="flex-grow h-px bg-white/20" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <InputField
                            size="sm"
                            name="name"
                            type="text"
                            label="Full Name"
                            placeholder="John Vendor"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            size="sm"
                            name="email"
                            type="text"
                            label="Email Address"
                            placeholder="vendor@example.com"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            size="sm"
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            register={register}
                            errors={errors}
                        />

                        <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 font-semibold text-white tracking-wide shadow-lg shadow-blue-500/20 text-sm sm:text-base"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                <p className="text-center text-xs sm:text-sm text-gray-400 pt-2">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-400 hover:text-purple-400 font-medium"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
