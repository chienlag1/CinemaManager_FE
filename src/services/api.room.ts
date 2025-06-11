// src/services/api.room.ts

import type { CreateRoomData, UpdateRoomData, Room } from '../types/room.type';
import api from './api.axios';

/**
 * Interface cho phản hồi API khi lấy danh sách phòng.
 */
interface AllRoomsResponse {
  status: string;
  results: number;
  data: {
    rooms: Room[];
  };
}

/**
 * Interface cho phản hồi API khi tạo/cập nhật phòng.
 */
interface MutateRoomResponse {
  status: string;
  message: string;
  data: {
    room: Room;
  };
}

/**
 * Interface cho phản hồi API khi xóa phòng.
 */
interface DeleteRoomResponse {
  status: string;
  message: string;
  data: null;
}

export const roomApiService = {
  /**
   * Lấy tất cả các phòng.
   * GET /api/rooms
   */
  getAllRooms: async (): Promise<AllRoomsResponse> => {
    const response = await api.get<AllRoomsResponse>('/rooms');
    return response.data;
  },

  /**
   * Tạo phòng mới.
   * POST /api/rooms
   */
  createRoom: async (data: CreateRoomData): Promise<MutateRoomResponse> => {
    const response = await api.post<MutateRoomResponse>('/rooms', data);
    return response.data;
  },

  /**
   * Cập nhật phòng.
   * PUT /api/rooms/:id
   */
  updateRoom: async (id: string, data: UpdateRoomData): Promise<MutateRoomResponse> => {
    const response = await api.put<MutateRoomResponse>(`/rooms/${id}`, data);
    return response.data;
  },

  /**
   * Xóa phòng.
   * DELETE /api/rooms/:id
   */
  deleteRoom: async (id: string): Promise<DeleteRoomResponse> => {
    const response = await api.delete<DeleteRoomResponse>(`/rooms/${id}`);
    return response.data;
  },
};
