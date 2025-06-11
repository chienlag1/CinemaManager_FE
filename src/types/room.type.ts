// src/types/room.type.ts

// Kiểu dữ liệu loại phòng
export type RoomType = '2D' | '3D' | 'IMAX' | 'VIP' | 'Standard';

// Kiểu dữ liệu cho một ghế
export interface Seat {
  _id: string;
  row: string;
  number: number;
  isOccupied: boolean;
  // Nếu có thêm thuộc tính khác, thêm tại đây
}

// Kiểu dữ liệu cho một phòng chiếu phim
export interface Room {
  _id: string;
  name: string;
  capacity: number;
  type: RoomType;
  isActive: boolean;
  seats: Seat[];
  createdAt: string;
  updatedAt: string;
  __v?: number; // Mongoose version key, có thể có hoặc không
}

// Dữ liệu khi tạo phòng mới
export interface CreateRoomData {
  name: string;
  capacity: number;
  type: RoomType;
  isActive: boolean;
  // Ghế thường được backend tự tạo => không cần gửi lên khi tạo
}

// Dữ liệu khi cập nhật phòng (có thể cập nhật một phần)
export interface UpdateRoomData {
  name?: string;
  capacity?: number;
  type?: RoomType;
  isActive?: boolean;
  seats?: Seat[]; // Nếu muốn cập nhật danh sách ghế
}

// Phản hồi khi gọi API lấy tất cả phòng
export interface AllRoomsResponse {
  data: Room[];
  total: number;
  // Nếu API trả thêm page, limit... có thể thêm vào
}
