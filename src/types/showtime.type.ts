// src/types/showtime.type.ts

import type { Movie } from "./movie.type";
import type { Room } from "./room.type";


export interface IBookedSeat {
  row: string;
  number: number;

}

export interface IShowtime {
  _id: string;
  movie: Movie; // <-- Đã thay đổi IMovie thành Movie
  room: Room;
  startTime: string;
  endTime?: string;
  price: number;
  availableSeats: number;
  bookedSeats: IBookedSeat[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateShowtimePayload {
  movie: string; // Đây là ID của phim
  room: string; // Đây là ID của phòng
  startTime: string;
  price: number;
}

export type IUpdateShowtimePayload = Partial<
  ICreateShowtimePayload & {
    isActive: boolean;
  }
>;

export interface IApiResponse<T> {
  status: 'success' | 'error';
  results?: number;
  data: {
    [key: string]: T;
  };
  message?: string;
}