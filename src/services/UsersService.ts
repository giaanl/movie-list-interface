import { API_BASE_URL } from "@/shared/Config";
import { RegisterUserDto } from "@/dtos/RegisterUser";
import { LoginDto } from "@/dtos/LoginDto";
import { request } from "./requestService";

export const UsersService = {
  registerUser: async (params: RegisterUserDto) => {
    return request(`${API_BASE_URL}/authentication/register`, {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  login: async (params: LoginDto) => {
    return request(`${API_BASE_URL}/authentication/login`, {
      method: "POST",
      body: JSON.stringify(params),
    });
  },
};
