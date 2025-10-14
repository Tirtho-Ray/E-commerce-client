import { useMutation } from "@tanstack/react-query";
import {  loginUser, registerUser, veryFiOtp } from "../../services/authServices";


export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
export const useVeryFiOtp = () => {
  return useMutation({
    mutationFn: veryFiOtp,
  });
};


