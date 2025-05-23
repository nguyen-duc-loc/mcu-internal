type SettingsTab = "information" | "account" | "appearance";

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

type Role = "admin" | "editor" | "viewer";
type GetRoleResponseData = {
  role: string;
};

interface UserModel {
  id: string;
  email: string;
  fullName: string;
  hashedPassword: string;
  role: Role;
}
type User = Omit<UserModel, "hashedPassword">;
type CreateUserResponseData = User;
type GetAllUsersResponseData = User[];
type GetUserByIdResponseData = User | null;

type Status = "proceeding" | "completed";
interface CustomerModel {
  id: string;
  name: string;
  status: Status;
  proservice: number;
  funding: number;
  credit: number;
  win: boolean;
  endDate?: string;
}
type Customer = CustomerModel;
type CreateCustomerResponseData = Customer;
type GetAllCustomersResponseData = Customer[];
type GetCustomerByIdResponseData = Customer | null;
