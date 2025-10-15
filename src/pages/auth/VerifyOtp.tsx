import React, { useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { useVeryFiOtp } from "../../hooks/mutations/useAuth";
import toast, { Toaster } from 'react-hot-toast';

interface VerifyOtpProps {
    length?: number;
    onVerify?: (otp: string) => void;
}

const VerifyOtp: React.FC<VerifyOtpProps> = ({ length = 6, onVerify }) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputsRef = useRef<HTMLInputElement[]>([]);
    const { mutate } = useVeryFiOtp();

    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId;
    const redirectTo = location.state?.redirectTo || "/";

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
            const value = e.target.value.replace(/\D/, "");
            if (!value) return;

            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (index < length - 1) {
                inputsRef.current[index + 1]?.focus();
            }
        },
        [otp, length]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
            if (e.key === "Backspace") {
                if (otp[index]) {
                    const newOtp = [...otp];
                    newOtp[index] = "";
                    setOtp(newOtp);
                } else if (index > 0) {
                    inputsRef.current[index - 1]?.focus();
                }
            } else if (e.key === "ArrowLeft" && index > 0) {
                inputsRef.current[index - 1]?.focus();
            } else if (e.key === "ArrowRight" && index < length - 1) {
                inputsRef.current[index + 1]?.focus();
            }
        },
        [otp, length]
    );

    const handlePaste = useCallback(
        (e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
            const pasteData = e.clipboardData.getData("Text").replace(/\D/g, "");
            if (!pasteData) return;

            const newOtp = pasteData.split("").slice(0, length);
            setOtp((prev) => {
                const updated = [...prev];
                newOtp.forEach((digit, i) => (updated[i] = digit));
                return updated;
            });
            newOtp.forEach((digit, i) => {
                if (inputsRef.current[i]) {
                    inputsRef.current[i]!.value = digit;
                }
            });
            const nextIndex = Math.min(newOtp.length, length - 1);
            inputsRef.current[nextIndex]?.focus();
        },
        [length]
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const enteredOtp = otp.join("");

            if (enteredOtp.length !== length) {
                toast.error("Please enter the full OTP");
                return;
            }

            if (!userId) {
                toast.error("User ID missing. Please register again.");
                return;
            }

            // Send both otp + userId to backend
            mutate(
                { otp: enteredOtp, userId },
                {
                    onSuccess: (response) => {
                        // console.log("response:", response)
                        // console.log("response.data:", response.data)
                        const { accessToken, refreshToken } = response?.data || {};
                        if (accessToken && refreshToken) {
                            localStorage.setItem("accessToken", accessToken);
                            localStorage.setItem("refreshToken", refreshToken);
                        }
                        // console.log("response token: ", accessToken, refreshToken)
                        toast.success("OTP verified successfully!");
                        navigate(redirectTo, { replace: true });
                    },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onError: (err: any) => {
                        const message =
                            err?.response?.data?.message || "Invalid OTP, please try again!";
                        toast.error(message);
                    },
                }
            );

            onVerify?.(enteredOtp);
        },
        [otp, length, onVerify, userId, mutate, redirectTo]
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            {/* Toast Container */}
            <Toaster position="top-center" reverseOrder={false} />

            <div className="w-full md:max-w-md sm:max-w-sm bg-white rounded-xl shadow-md p-6 space-y-6">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Verify OTP</h2>
                    <p className="text-sm text-gray-500">
                        Enter the {length}-digit code sent to your email
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mt-3">
                        {Array.from({ length }).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={otp[index]}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                ref={(el) => {
                                    if (el) inputsRef.current[index] = el;
                                }}
                                className="h-9 w-8 md:w-10 md:h-12 sm:w-12 sm:h-14 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg transition-all"
                                aria-label={`OTP digit ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white text-sm py-2 rounded-md hover:bg-blue-700 active:scale-[0.98] transition"
                    >
                        Verify
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Didn’t receive the code?{" "}
                    <button
                        type="button"
                        onClick={() => toast('OTP resent!')}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Resend
                    </button>
                </p>
            </div>
        </div>
    );
};

export default VerifyOtp;
