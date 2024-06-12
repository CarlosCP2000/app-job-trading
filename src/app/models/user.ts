export interface User {
  id: string;
  username: string;
  name: string;
  lastname: string;
  password: string;
  email_notifications: string;
  identification_number: string;
  identification_type: string;
  status: string;
  failed_attempts: string;
  block_date: Date;
  is_block: boolean;
  created_at: Date;
  update_at: Date;
  is_deleted: boolean;
  favorite_phrase: string;
}

export interface RegisterRequest {
  username: string;
  name: string;
  lastname: string;
  password: string;
  email_notifications: string;
  identification_number: string;
  identification_type: string;
}

export interface ResponseUser {
  error: string;
  data: string;
  code: number;
  type: string;
  msg: string;
}

export interface AlertForm {
  type: string;
  visible: boolean;
  message: string;
}

