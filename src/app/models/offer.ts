export interface ResponseOffers {
  error: string;
  data: {
    offers: {
      current_page: number;
      data: Offer[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: Array<{ url: string | null; label: string; active: boolean }>;
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
    }
  };
  code: number;
  type: string;
  msg: string;
}

export interface ResponseCreateOffer {
  id: number;
}

export interface RequestCreateOffer {
  name: string;
  description: string;
  deadline: number;
  price: string;
  type: string;
  category: string;
  image_data: RequestImageOffer[];
  address: string;
  user_id: string;
}

export interface RequestImageOffer {
  file_name: string;
  file_extension: string;
  image: string;
}

export interface ImageOffer {
  id: number;
  image: string;
  file_name: string;
  file_extension: string;
  status: number;
  user_id: string;
  offer_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ResponseImageOffer {
  error: string;
  code: number;
  data: {
    offer_images: ImageOffer[];
  };
  type: string;
  msg: string;
}
export interface RequestListOffer {
  category: string;
  user_id: string;
}

export interface RequestListOffers {

}



export interface Offer {
  id: number;
  name: string;
  description: string;
  deadline: string;
  price: number;
  status: number;
  type: string;
  category: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  rating: number;
}

export interface ResponseOffer {
  error: string;
  code: number;
  data: {
    offer: Offer;
  };
  type: string;
  msg: string;
}

export interface ResponseCategory {
  error: string;
  code: number;
  data: {
    categories: Category[];
  };
  type: string;
  msg: string;
}

export interface Category {
  id: number;
  name: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export interface RequestOfferRequest {
  offer_id: number;
  user_id: string;
}

export interface ResponseOfferRequest {
  error: string;
  code: number;
  data: OfferRequest;
  type: string;
  msg: string;

}
export interface OfferRequest {
  id: number;
  offer_id: number;
  user_id: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}
