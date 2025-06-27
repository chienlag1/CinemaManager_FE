// services/api.ticket.ts
import axios from "axios";
import type { CreateTicketPayload, Ticket, UpdateTicketStatusPayload } from "../types/ticket.type";


export const ticketApiService = {
  // POST /api/tickets
  createTicket: (payload: CreateTicketPayload) =>
    axios.post<{ data: { ticket: Ticket } }>('/api/tickets', payload),

  // GET /api/tickets (User xem vé của họ)
  getMyTickets: () =>
    axios.get<{ data: { tickets: Ticket[] } }>('/api/tickets'),

  // GET /api/tickets/admin?status=... (Admin)
  getAllTickets: (params?: {
    user?: string;
    showtime?: string;
    status?: string;
  }) =>
    axios.get<{ data: { tickets: Ticket[] } }>(
      '/api/tickets/admin',
      { params }
    ),

  // GET /api/tickets/:id
  getTicketById: (id: string) =>
    axios.get<{ data: { ticket: Ticket } }>(`/api/tickets/${id}`),

  // PUT /api/tickets/:id (Admin cập nhật trạng thái)
  updateTicketStatus: (id: string, payload: UpdateTicketStatusPayload) =>
    axios.put<{ data: { ticket: Ticket } }>(
      `/api/tickets/${id}`,
      payload
    ),

  // DELETE /api/tickets/:id (Admin)
  deleteTicket: (id: string) =>
    axios.delete(`/api/tickets/${id}`),
};
