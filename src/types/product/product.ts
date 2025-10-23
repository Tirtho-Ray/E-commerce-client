

// Variant attribute — flexible for dynamic product attributes (color, size, etc.)
export type TVariantAttribute = Record<string, string | number | boolean>;

// Each variant of a product (like "Red - XL" etc.)
export type TVariant = {
  color: string;
  variantPictures?: string[];
  sizes: {
    size: string;
    stock: number;
    additionalPrice?: number;
    sku?: string;
  }[];
};
;;

// Main Product Type
export interface TProduct {
  productId?: string; 
  _id:string;

  item: {
    name: string;
    slug: string;
    description: string;
    price: number;    
    quantity: number; 
    category:  { name: string };
    subCategory: string;

    variants?: TVariant[];
    brand?: string;
    tags?: string[];
    isAvailable: boolean;
    picture: string;
    manyPictures?: string[];
    productFor?: "men" | "women" | "kids" | "baby";
  };

  vendorID: string; 

  // Discount / Offer (set by vendor or admin)
 discount?: {
  type: "percentage" | "fixed"; 
  amount: number;
  
  startDate?: Date;
  endDate?: Date; 
  
  activeTime?: {
    specificDate?: Date;   
    startTime?: string;   
    endTime?: string;    
    repeatDaily?: boolean;
  };

  isActive?: boolean;       
  noEndDate?: boolean;     
  
  maxUsageLimit?: number;    
  usedCount?: number;
};


  // Shipping info
  shipping?: {
    isFree?: boolean;
    deliveryCharge?: string;
    estimatedDays?: string;
    courier?: string;
    locationBased?: boolean; 
  };

  // Review system
  reviews?: {
    averageRating: number;
    totalReviews: number;
    customerReviews: {
      userId:string;
      comment: string;
      rating: number;
      createdAt: Date;
    }[];
  };

  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };

  // Approval and Visibility Control
  status: "active" | "inactive" | "pending" | "rejected";
  visibility?: "public" | "private" | "draft";

  // Tracking and Analytics
  views?: number;
  wishlistedCount?: number;
  soldCount?: number; // how many sold
  createdAt?: Date;
  updatedAt?: Date;

  // Admin Management
  approvedBy?: string; // which admin approved it
  adminNotes?: string;
}
