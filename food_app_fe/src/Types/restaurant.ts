
export interface RestaurantAttributes {
  id?: number;
  user_id?: number;
  name?: string;
  phone?: string;
  image?: File;
  address?: string;
  _avg?: {
    rating: number;
  };
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FormInputs extends RestaurantAttributes {
  image: File;
}

export interface Rest {
  id: number | undefined;
  user_id: number | undefined;
  name: string | undefined;
  phone: string | undefined;
  image: File | undefined;
  address: string | undefined;
  _avg: {
    rating: number;
  };
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface RestaurantAverage {
  restaurant_id: number;
  user_id: number;
  restaurant_name: string;
  restaurant_image: string;
  average_rating: number | null;
}