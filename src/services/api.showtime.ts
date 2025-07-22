import type {
  ICreateShowtimePayload,
  IShowtime,
  IUpdateShowtimePayload,
} from '../types/showtime.type';
import api from './api.axios';

export const createShowtime = async (
  showtimeData: ICreateShowtimePayload
): Promise<IShowtime> => {
  try {
    const response = await api.post<IShowtime>('/showtimes', showtimeData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Không thể tạo suất chiếu mới.'
    );
  }
};

export const getAllShowtimes = async (filters?: {
  movie?: string;
  room?: string;
  date?: string;
}): Promise<IShowtime[]> => {
  try {
    type GetAllShowtimeResponse = {
      status: string;
      results: number;
      data: {
        showtimes: IShowtime[];
      };
    };

    const response = await api.get<GetAllShowtimeResponse>('/showtimes', {
      params: filters,
    });

    return response.data.data.showtimes || [];
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Không thể lấy danh sách suất chiếu.'
    );
  }
};

export const getShowtimeById = async (id: string): Promise<IShowtime> => {
  try {
    const response = await api.get<IShowtime>(`/showtimes/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        `Không tìm thấy suất chiếu với ID: ${id}.`
    );
  }
};

export const updateShowtime = async (
  id: string,
  updateData: IUpdateShowtimePayload
): Promise<IShowtime> => {
  try {
    const response = await api.put<IShowtime>(`/showtimes/${id}`, updateData);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        `Không thể cập nhật suất chiếu với ID: ${id}.`
    );
  }
};

export const deleteShowtime = async (id: string): Promise<void> => {
  try {
    await api.delete(`/showtimes/${id}`);
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        `Không thể xóa suất chiếu với ID: ${id}.`
    );
  }
};

export const showtimeApiService = {
  createShowtime,
  getAllShowtimes,
  getShowtimeById,
  updateShowtime,
  deleteShowtime,
};
