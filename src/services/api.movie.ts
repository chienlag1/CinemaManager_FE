// src/services/api.movie.ts

import type { Movie } from '../types/movie.type';
import api from './api.axios'; // Import instance Axios đã được cấu hình (ví dụ: với base URL và JWT token)



interface AllMoviesResponse {
  status: string;
  results: number;
  data: {
    movies: Movie[];
  };
}

interface SingleMovieResponse {
  status: string;
  data: {
    movie: Movie;
  };
}

interface MutateMovieResponse {
  status: string;
  message: string;
  data: {
    movie: Movie;
  };
}

interface DeleteMovieResponse {
  status: string;
  message: string;
  data: null;
}


const movieApiService = {

  getAllMovies: async (params?: any): Promise<AllMoviesResponse> => {
    const response = await api.get<AllMoviesResponse>('/movies', { params });
    return response.data;
  },

 
  getMovieById: async (id: string): Promise<SingleMovieResponse> => {
    const response = await api.get<SingleMovieResponse>(`/movies/${id}`);
    return response.data;
  },

  /**
   * Tạo một bộ phim mới.
   * POST /api/movies
   * @param movieData Dữ liệu phim mới.
   * @returns Promise<MutateMovieResponse>
   */
  createMovie: async (movieData: Partial<Movie>): Promise<MutateMovieResponse> => {
    const response = await api.post<MutateMovieResponse>('/movies', movieData);
    return response.data;
  },

  updateMovie: async (id: string, movieData: Partial<Movie>): Promise<MutateMovieResponse> => {
    const response = await api.patch<MutateMovieResponse>(`/movies/${id}`, movieData);
    return response.data;
  },

  deleteMovie: async (id: string): Promise<DeleteMovieResponse> => {

    const response = await api.delete<DeleteMovieResponse>(`/movies/${id}`);
    return response.data; // 
  },

  /**
   * Lấy danh sách phim đang chiếu.
   * GET /api/movies/showing
   * @returns Promise<AllMoviesResponse>
   */
  getShowingMovies: async (): Promise<AllMoviesResponse> => {
    const response = await api.get<AllMoviesResponse>('/movies/showing');
    return response.data;
  },

  /**
   * Lấy danh sách phim sắp chiếu.
   * GET /api/movies/upcoming
   * @returns Promise<AllMoviesResponse>
   */
  getUpcomingMovies: async (): Promise<AllMoviesResponse> => {
    const response = await api.get<AllMoviesResponse>('/movies/upcoming');
    return response.data;
  },

  getMoviesByGenre: async (genre: string): Promise<AllMoviesResponse> => {
    const response = await api.get<AllMoviesResponse>(`/movies/genre/${genre}`);
    return response.data;
  },
};

export default movieApiService;
