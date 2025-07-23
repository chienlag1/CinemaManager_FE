// src/services/api.ticket.ts
import api from './api.axios';
import type {
  CreateTicketPayload,
  Ticket,
  UpdateTicketStatusPayload,
} from '../types/ticket.type';

export const ticketApiService = {
  // Hàm createTicket: Backend trả về { ticket: Ticket }, nên frontend cần truy cập res.data.ticket
  createTicket: async (payload: CreateTicketPayload): Promise<Ticket> => {
    console.log('🔥 [createTicket] Payload:', payload);
    // Thay đổi kiểu dữ liệu mong đợi và cách truy cập
    const res = await api.post<{ ticket: Ticket }>('/tickets', payload);
    return res.data.ticket; // Đã sửa từ res.data.data.ticket
  },

  // Hàm getMyTickets: Backend trả về { tickets: Ticket[] }, nên frontend cần truy cập res.data.tickets
  getMyTickets: async () => {
    // Thay đổi kiểu dữ liệu mong đợi và cách truy cập
    const res = await api.get<{ tickets: Ticket[] }>('/tickets');
    return res.data.tickets; // Đã sửa từ res.data.data.tickets
  },

  // Hàm getAllTickets: Backend trả về { tickets: Ticket[] }, nên frontend cần truy cập res.data.tickets
  getAllTickets: async (params?: {
    user?: string;
    showtime?: string;
    status?: string;
  }) => {
    // Thay đổi kiểu dữ liệu mong đợi và cách truy cập
    const res = await api.get<{ tickets: Ticket[] }>('/tickets/admin', {
      params,
    });
    return res.data.tickets; // Đã sửa từ res.data.data.tickets
  },

  // Hàm getTicketById: Backend trả về { ticket: Ticket }, nên frontend cần truy cập res.data.ticket
  getTicketById: async (id: string) => {
    // Thay đổi kiểu dữ liệu mong đợi và cách truy cập
    const res = await api.get<{ ticket: Ticket }>(`/tickets/${id}`);
    return res.data.ticket; // Đã sửa từ res.data.data.ticket
  },

  // Hàm updateTicketStatus: Backend trả về { ticket: Ticket }, nên frontend cần truy cập res.data.ticket
  updateTicketStatus: async (
    id: string,
    payload: UpdateTicketStatusPayload
  ) => {
    // Thay đổi kiểu dữ liệu mong đợi và cách truy cập
    const res = await api.put<{ ticket: Ticket }>(`/tickets/${id}`, payload);
    return res.data.ticket; // Đã sửa từ res.data.data.ticket
  },

  // Hàm deleteTicket: Backend trả về dữ liệu trực tiếp, không cần thay đổi
  deleteTicket: async (id: string) => {
    const res = await api.delete(`/tickets/${id}`);
    return res.data;
  },
};
