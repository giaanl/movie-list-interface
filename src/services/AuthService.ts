import { API_BASE_URL } from "@/shared/Config";
import axios from "axios";
import { cookies } from "next/headers";

export const AuthService = {
  getToken: async () => {
    const nextCookies = await cookies();
    const token = nextCookies.get("MOVIE-LIST::TOKEN");
    return token?.value;
  },

  validToken: async (token: string) => {
    return axios({
      url: `${API_BASE_URL}/authentication/token-valid`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
