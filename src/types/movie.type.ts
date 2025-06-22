export interface Movie {
  _id: string; // MongoDB tự động tạo ID
  title: string;
  description: string;
  releaseDate: string; // Sử dụng `string` để biểu diễn ngày dưới dạng ISO 8601 string (vd: "2024-06-07T00:00:00.000Z"           // Khi làm việc với form input type="date", bạn sẽ cần format thành "YYYY-MM-DD"
  duration: number; // Thời lượng phim tính bằng phút
  genre: string[]; // Mảng các thể loại phim
  posterUrl: string; // URL của poster phim
  trailerUrl?: string; // URL của trailer phim (tùy chọn)
  rating?: number; // Điểm đánh giá (tùy chọn, có giá trị mặc định trong schema)
  isShowing: boolean; // Trạng thái phim: đang chiếu hay sắp chiếu
  createdAt?: string; // Thời gian tạo tài liệu (MongoDB timestamps)
  updatedAt?: string; 
}
