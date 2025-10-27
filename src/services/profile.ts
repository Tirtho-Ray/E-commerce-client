/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "../api/baseApi/axiosInstance";

export const getMe = async () => {
  const response = await axiosInstance.get("/users/me");
  return response.data;
};

type TAddressForm = {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
};

export type TProfile = {
    name: string;
    mobileNumber: string;
    addresses: TAddressForm;
    profilePhoto?: any;
};


export const UpdateMe = async (payload: TProfile) => {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("mobileNumber", payload.mobileNumber);

  // address fields
  formData.append("addresses.street", payload.addresses.street);
  formData.append("addresses.city", payload.addresses.city);
  formData.append("addresses.state", payload.addresses.state);
  formData.append("addresses.postalCode", payload.addresses.postalCode);
  formData.append("addresses.country", payload.addresses.country);

  // photo (optional)
  if (payload.profilePhoto) {
    formData.append("profilePhoto", payload.profilePhoto);
  }

  const response = await axiosInstance.patch("/users/update-me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
