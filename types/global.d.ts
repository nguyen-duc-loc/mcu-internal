type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details: Record<string, string[]>;
  };
  statusCode: number;
};

type AuthTokenPayload = {
  id: string;
};

type LoginResponseData = {
  token: string;
};

interface UserModel {
  id: string;
  email: string;
  fullName: string;
  hashedPassword: string;
  role: Role;
}
