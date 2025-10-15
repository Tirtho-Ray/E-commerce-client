/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../components/ui/forms/inputFields";
import { loginValidation } from "../../utils/validation/loginValidation";
import type { TLogin } from "../../types/auth/login";
import { useLogin } from "../../hooks/mutations/useAuth";
import toast from "react-hot-toast";

const Login: React.FC = () => {
    const { mutate } = useLogin();
    const navigate = useNavigate()
    const location = useLocation();
    const redirectTo = location.state?.redirectTo || "/"
    console.log(redirectTo);

    const { register, handleSubmit, formState: { errors }
    } = useForm<TLogin>({
        // mode: "all",
        resolver: zodResolver(loginValidation),
    });

    const onSubmit = (formData: TLogin) => {
        mutate(formData, {
            onSuccess: (data: any) => {
                // console.log(data)
                const { accessToken, refreshToken } = data.data || {};
                if (accessToken && refreshToken) {
                    localStorage.setItem("accessToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                }
                // console.log(accessToken)
                if (data.success === false) {
                    toast.error(data.message || "Login failed");
                    return;
                }
                if (data.success == true) {
                    // console.log(data.message)
                    toast.success(data.message);
                    navigate(redirectTo, { replace: true });
                }
            },
            onError: (err: any) => {
                const message = err.message
                console.log(message)
                toast.error(message);
            },
        });
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white px-4 py-8">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8 shadow-[0_0_25px_rgba(0,0,0,0.5)] space-y-6 transition-all duration-300">
                {/* Header */}
                <div className="text-center space-y-1">
                    <h2 className="text-sm md:text-md lg:text-xl  font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Login Now
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

                <div className="flex items-center text-xs sm:text-sm text-gray-400 gap-2">
                    <div className="flex-grow h-px bg-white/20" />
                    <span>or</span>
                    <div className="flex-grow h-px bg-white/20" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-5">
                        <InputField
                            size="sm"
                            name="email"
                            type="email"
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

                        <div className="flex flex-row items-center justify-between gap-2 text-xs sm:text-sm text-gray-400">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-blue-600 scale-90 sm:scale-100" />
                                Remember me
                            </label>
                            <a href="#" className="text-blue-400 hover:underline hover:text-purple-400">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 transition-all duration-300 font-semibold text-white tracking-wide shadow-lg shadow-blue-500/20 text-sm sm:text-base"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <p className="text-center text-xs sm:text-sm text-gray-400 pt-2">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-400 hover:text-purple-400 font-medium"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;