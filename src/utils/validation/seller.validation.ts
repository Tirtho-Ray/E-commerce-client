// src/types/vendor.types.ts
import { z } from "zod";

export const AddressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
});

export const SocialLinksSchema = z.object({
  facebook: z.string().url("Invalid Facebook URL").optional(),
  instagram: z.string().url("Invalid Instagram URL").optional(),
  twitter: z.string().url("Invalid Twitter URL").optional(),
  linkedin: z.string().url("Invalid LinkedIn URL").optional(),
});

export const BankDetailsSchema = z.object({
  accountNumber: z.string().min(10, "Account number must be at least 10 digits"),
  accountHolderName: z.string().min(2, "Account holder name is required"),
  bankName: z.string().min(2, "Bank name is required"),
  ifscCode: z.string().min(5, "IFSC code is required"),
});

export const DocumentsSchema = z.object({
  nationalId: z.string().min(5, "National ID is required"),
  tradeLicense: z.string().min(5, "Trade license is required"),
  otherDocs: z.array(
    z.object({
      name: z.string().min(1, "Document name required"),
      url: z.string().url("Invalid URL"),
    })
  ).optional(),
});

export const VendorValidation = z.object({
  shopName: z.string().min(2, "Shop name is required").max(100),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(15),
  address: AddressSchema,
  logoImg: z.string().url("Invalid logo URL"),
  bannerImg: z.string().url("Invalid banner URL"),
  website: z.string().url("Invalid website URL"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  socialLinks: SocialLinksSchema,
  bankDetails: BankDetailsSchema,
  documents: DocumentsSchema,
  businessType: z.enum(["individual", "company", "reseller", "manufacturer"]),
  productCategories: z.string(),
});

export type TVendor = z.infer<typeof VendorValidation>;
