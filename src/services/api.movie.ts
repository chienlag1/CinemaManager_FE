// src/services/api.movie.ts

import type { Movie } from '../types/movie.type';
import api from './api.axios'; // Import instance Axios đã được cấu hình (ví dụ: với base URL và JWT token)


/**
 * Interface cho phản hồi API khi lấy danh sách phim.
 * Chứa mảng phim và tổng số kết quả.
 */
interface AllMoviesResponse {
  status: string;
  results: number;
  data: {
    movies: Movie[];
  };
}

/**
 * Interface cho phản hồi API khi lấy một phim cụ thể.
 */
interface SingleMovieResponse {
  status: string;
  data: {
    movie: Movie;
  };
}

/**
 * Interface cho phản hồi API khi tạo/cập nhật phim.
 * Chứa thông báo và dữ liệu phim đã được tạo/cập nhật.
 */
interface MutateMovieResponse {
  status: string;
  message: string;
  data: {
    movie: Movie;
  };
}

/**
 * Interface cho phản hồi API khi xóa phim.
 * Endpoint DELETE của bạn trả về status 204 No Content,
 * nhưng trong thực tế, response body vẫn có thể chứa status và message.
 */
interface DeleteMovieResponse {
  status: string;
  message: string;
  data: null;
}

/**
 * Dịch vụ API cho các thao tác liên quan đến phim.
 */
const movieApiService = {
  /**
   * Lấy tất cả các bộ phim.
   * GET /api/movies
   * @param params Các tham số truy vấn (ví dụ: page, limit, filter).
   * @returns Promise<AllMoviesResponse>
   */
  getAllMovies: async (params?: any): Promise<AllMoviesResponse> => {
    const response = await api.get<AllMoviesResponse>('/movies', { params });
    return response.data;
  },

  /**
   * Lấy một phim cụ thể bằng ID.
   * GET /api/movies/:id
   * @param id ID của phim.
   * @returns Promise<SingleMovieResponse>
   */
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

  /**
   * Cập nhật thông tin một bộ phim bằng ID.
   * PATCH /api/movies/:id
   * @param id ID của phim cần cập nhật.
   * @param movieData Dữ liệu cập nhật.
   * @returns Promise<MutateMovieResponse>
   */
  updateMovie: async (id: string, movieData: Partial<Movie>): Promise<MutateMovieResponse> => {
    const response = await api.patch<MutateMovieResponse>(`/movies/${id}`, movieData);
    return response.data;
  },

  /**
   * Xóa một bộ phim bằng ID.
   * DELETE /api/movies/:id
   * @param id ID của phim cần xóa.
   * @returns Promise<DeleteMovieResponse>
   */
  deleteMovie: async (id: string): Promise<DeleteMovieResponse> => {
    // Lưu ý: Backend của bạn trả về status 204 No Content cho DELETE thành công,
    // điều này có nghĩa là response.data có thể là rỗng hoặc không có gì.
    // Tuy nhiên, nếu bạn muốn vẫn nhận được 'status' và 'message' từ body,
    // thì backend cần phải gửi chúng ngay cả với 204 hoặc bạn cần xử lý trường hợp response.data là rỗng.
    // Với backend hiện tại của bạn, response.data sẽ là rỗng với 204.
    // Nếu bạn muốn frontend nhận được message, backend cần thay đổi status code thành 200 OK
    // khi xóa thành công và gửi body với message.
    const response = await api.delete<DeleteMovieResponse>(`/movies/${id}`);
    return response.data; // Có thể là undefined nếu backend trả về 204 và không có body
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

  /**
   * Lấy danh sách phim theo thể loại.
   * GET /api/movies/genre/:genre
   * @param genre Tên thể loại.
   * @returns Promise<AllMoviesResponse>
   */
  getMoviesByGenre: async (genre: string): Promise<AllMoviesResponse> => {
    const response = await api.get<AllMoviesResponse>(`/movies/genre/${genre}`);
    return response.data;
  },
};

export default movieApiService;
