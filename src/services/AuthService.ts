import { API_BASE_URL } from "@/shared/Config";
import { cookies } from "next/headers";
import { request } from "./requestService";
export const AuthService = {
  getToken: async () => {
    const nextCookies = await cookies();
    const token = nextCookies.get("MOVIE-LIST::TOKEN");
    return token?.value;
  },

  validToken: async (token: string) => {
    if (!token) {
      throw new Error("Token não encontrado");
    }

    return request(`${API_BASE_URL}/authentication/token-valid`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
