import { API_BASE_URL } from "@/shared/Config";
import { Movie } from "@/types/Movies";
import { request } from "./RequestService";
import { getCookie } from "cookies-next";
import { MovieFilters } from "@/components/modalFilter/modalFilter";

export const MoviesService = {
  getMovies: async (filters?: MovieFilters) => {
    const token = getCookie("MOVIE-LIST::TOKEN");
    
    const queryParams = new URLSearchParams();
    
    if (filters) {
      if (filters.minDuration) queryParams.append('minDuration', filters.minDuration.toString());
      if (filters.maxDuration) queryParams.append('maxDuration', filters.maxDuration.toString());
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      if (filters.genre) queryParams.append('genre', filters.genre);
    }

    const url = `${API_BASE_URL}/movies${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    return request(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },

  createMovie: async (movie: Movie) => {
    const token = getCookie("MOVIE-LIST::TOKEN");

    return request(`${API_BASE_URL}/movies`, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },

  updateMovie: async (movie: Movie) => {
    const token = getCookie("MOVIE-LIST::TOKEN");

    return request(`${API_BASE_URL}/movies/${movie.id}`, {
      method: "PUT",
      body: JSON.stringify(movie),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
};
