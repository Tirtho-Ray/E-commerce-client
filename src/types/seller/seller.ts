
type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type SocialLinks = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  [key: string]: string | undefined;
}

type BankDetails = {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
};

type Documents = {
  nationalId: string;
  tradeLicense: string;
  otherDocs?: OtherDocument[];
};

type OtherDocument = {
  name: string;
  url: string;
};

export type TVendor = {
  shopName: string;
  email: string;
  phone: string;
  address: Address;
  logoImg: string;
  bannerImg: string;
  description: string;
  website: string;
  socialLinks: SocialLinks;
  bankDetails: BankDetails;
  documents: Documents;
  businessType: 'individual' | 'company' | 'reseller' | 'manufacturer';
  productCategories: string[];
};