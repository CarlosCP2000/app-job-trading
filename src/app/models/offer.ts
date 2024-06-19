export interface Response {
  error: string;
  data: string;
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

export interface RequestListOffer {
  category: string;
  user_id: string;
}

export interface RequestImageOffer {
  file_name: string;
  file_extension: string;
  image: string;
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
