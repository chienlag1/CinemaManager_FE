/**
 * @file Tệp này chứa các hàm để tương tác với các điểm cuối API Showtime sử dụng Axios.
 * Nó cung cấp các phương thức để tạo, truy xuất, cập nhật và xóa suất chiếu.
 */

import type { ICreateShowtimePayload, IShowtime, IUpdateShowtimePayload } from "../types/showtime.type";
import api from "./api.axios";


/**
 * Tạo một suất chiếu mới.
 * @param showtimeData Dữ liệu cho suất chiếu mới.
 * @returns Một promise giải quyết thành đối tượng suất chiếu đã tạo.
 * @throws Lỗi nếu yêu cầu API không thành công.
 */
export const createShowtime = async (showtimeData: ICreateShowtimePayload): Promise<IShowtime> => {
  try {
    const response = await api.post<IShowtime>('/showtimes', showtimeData);
    return response.data;
  } catch (error: any) {
    // Axios tự động ném lỗi nếu status code không phải 2xx
    // Bạn có thể xử lý lỗi cụ thể hơn ở đây nếu cần
    throw new Error(error.response?.data?.message || error.message || 'Không thể tạo suất chiếu mới.');
  }
};

/**
 * Truy xuất tất cả các suất chiếu, với tùy chọn lọc.
 * @param filters Các tham số lọc tùy chọn (movie, room, date).
 * @returns Một promise giải quyết thành một mảng các đối tượng suất chiếu.
 * @throws Lỗi nếu yêu cầu API không thành công.
 */
export const getAllShowtimes = async (
  filters?: { movie?: string; room?: string; date?: string }
): Promise<IShowtime[]> => {
  try {
    // Định nghĩa đúng kiểu dữ liệu trả về từ API
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

    // Truy cập đúng cấu trúc dữ liệu
    return response.data.data.showtimes || [];
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || 'Không thể lấy danh sách suất chiếu.'
    );
  }
};


/**
 * Truy xuất một suất chiếu duy nhất bằng ID của nó.
 * @param id ID của suất chiếu cần truy xuất.
 * @returns Một promise giải quyết thành đối tượng suất chiếu.
 * @throws Lỗi nếu yêu cầu API không thành công hoặc suất chiếu không tìm thấy.
 */
export const getShowtimeById = async (id: string): Promise<IShowtime> => {
  try {
    const response = await api.get<IShowtime>(`/showtimes/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || `Không tìm thấy suất chiếu với ID: ${id}.`);
  }
};

/**
 * Cập nhật một suất chiếu hiện có.
 * @param id ID của suất chiếu cần cập nhật.
 * @param updateData Dữ liệu để cập nhật suất chiếu.
 * @returns Một promise giải quyết thành đối tượng suất chiếu đã cập nhật.
 * @throws Lỗi nếu yêu cầu API không thành công.
 */
export const updateShowtime = async (id: string, updateData: IUpdateShowtimePayload): Promise<IShowtime> => {
  try {
    const response = await api.put<IShowtime>(`/showtimes/${id}`, updateData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || `Không thể cập nhật suất chiếu với ID: ${id}.`);
  }
};

/**
 * Xóa một suất chiếu bằng ID của nó.
 * @param id ID của suất chiếu cần xóa.
 * @returns Một promise giải quyết khi suất chiếu được xóa thành công.
 * @throws Lỗi nếu yêu cầu API không thành công.
 */
export const deleteShowtime = async (id: string): Promise<void> => {
  try {
    await api.delete(`/showtimes/${id}`);
    // Axios không ném lỗi cho 204 No Content, nên không cần kiểm tra response.ok
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || `Không thể xóa suất chiếu với ID: ${id}.`);
  }
};
