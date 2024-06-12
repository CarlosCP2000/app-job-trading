export interface ResponseLogin{
  error: boolean;
  data: Token;
  code: number;
  type: string;
  msg: string;
}

export interface Token{
  token: string;
}

export interface LoginRequest{
  username: string;
  password: string;
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
