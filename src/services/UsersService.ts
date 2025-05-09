import { API_BASE_URL } from "@/shared/Config";
import { RegisterUserDto } from "@/dtos/RegisterUser";
import axios from "axios";
import { LoginDto } from "@/dtos/LoginDto";

export const UsersService = {
  registerUser: async (params: RegisterUserDto) => {
    console.log(params);
    console.log(API_BASE_URL);
    return axios({
      url: `${API_BASE_URL}/authentication/register`,
      data: params,
      method: "POST",
    });
  },

  login: async (params: LoginDto) => {
    return axios({
      url: `${API_BASE_URL}/authentication/login`,
      data: params,
      method: "POST",
    });
  },
};
