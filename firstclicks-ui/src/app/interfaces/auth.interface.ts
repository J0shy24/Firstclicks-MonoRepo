export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Profile;
}

export interface Profile {
  userName: string;
  role: string;
}
