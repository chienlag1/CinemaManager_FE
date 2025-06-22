/**
 * @file Tệp này định nghĩa các giao diện TypeScript cho các mô hình Showtime, Movie và Room
 * để đảm bảo an toàn kiểu dữ liệu trên ứng dụng frontend khi tương tác với dữ liệu suất chiếu.
 */

// Giao diện cho một đối tượng Movie đơn giản hóa, như được nạp bởi backend.
// Điều này phản ánh các trường được truy xuất bởi `populate('movie', 'title posterUrl duration description')`.
export interface IMovie {
  _id: string;
  title: string;
  posterUrl?: string; // Tùy chọn, vì nó có thể không luôn có mặt hoặc hợp lệ
  duration: number; // Thời lượng tính bằng phút
  description?: string; // Chỉ được nạp cho `getShowtimeById`
}

// Giao diện cho một đối tượng Room đơn giản hóa, như được nạp bởi backend.
// Điều này phản ánh các trường được truy xuất bởi `populate('room', 'name type capacity seats')`.
export interface IRoom {
  _id: string;
  name: string;
  type: string;
  capacity: number;
  seats?: Array<{ row: string; number: number; }>; // Thông tin chi tiết ghế, được nạp cho `getShowtimeById`
}

// Giao diện cho một ghế đã được đặt
export interface IBookedSeat {
  row: string;
  number: number;
}

// Giao diện cho đối tượng Showtime, phản ánh lược đồ Mongoose.
export interface IShowtime {
  _id: string; // MongoDB ObjectId
  movie: IMovie; // Đối tượng Movie đã được nạp dữ liệu
  room: IRoom; // Đối tượng Room đã được nạp dữ liệu
  startTime: string; // Ngày được lưu dưới dạng chuỗi ISO
  endTime?: string; // Ngày được lưu dưới dạng chuỗi ISO, được tính toán ở backend
  price: number;
  availableSeats: number;
  bookedSeats: IBookedSeat[];
  isActive: boolean;
  createdAt: string; // Dấu thời gian từ Mongoose
  updatedAt: string; // Dấu thời gian từ Mongoose
}

// Giao diện cho dữ liệu mong đợi khi tạo một suất chiếu mới.
// `movie` và `room` được mong đợi dưới dạng ID (chuỗi) để tạo.
export interface ICreateShowtimePayload {
  movie: string; // ID phim
  room: string;  // ID phòng
  startTime: string; // Chuỗi ngày ISO
  price: number;
}

// Giao diện cho dữ liệu mong đợi khi cập nhật một suất chiếu.
// Tất cả các trường đều là tùy chọn vì các cập nhật có thể là một phần.
export type IUpdateShowtimePayload = Partial<ICreateShowtimePayload & {
  isActive: boolean;
}>;

// Giao diện cho cấu trúc phản hồi API (ví dụ: cho `getAllShowtimes`)
export interface IApiResponse<T> {
  status: 'success' | 'error';
  results?: number; // Cho các phản hồi danh sách
  data: {
    [key: string]: T; // ví dụ: { showtime: IShowtime } hoặc { showtimes: IShowtime[] }
  };
  message?: string; // Cho các phản hồi lỗi
}
