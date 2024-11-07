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
  user_id: string;
}

export interface RequestImageOffer {
  file_name: string;
  file_extension: string;
  image: string;
}
export interface RequestListOffer {
  category: string;
  user_id: string;
}



export interface RequestOfferAssignation {
  offer_id: number;
  user_id: string;
  status: number;
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
}

export interface ImageOffer {
  id: number;
  file_name: string;
  file_extension: string;
  offer_id: number;
  image: string;
  name: string;
  path: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export interface OfferAssignation {
  id: number;
  offer_id: number;
  user_id: string;
  status: number;
  created_at: Date;
  updated_at: Date;
}
