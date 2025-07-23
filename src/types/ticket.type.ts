// types/ticket.type.ts
import type { Seat } from './room.type';
import type { IBookedSeat } from './showtime.type';

export type TicketStatus = 'pending' | 'paid' | 'cancelled' | 'used' | 'refunded';

export interface Ticket {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  showtime: {
    _id: string;
    startTime: string;
    price: number;
    movie: {
      _id: string;
      title: string;
      posterUrl: string;
    };
    room: {
      _id: string;
      name: string;
    };
  };
  seats: Seat[];
  totalPrice: number;
  status: TicketStatus;
  paymentMethod?: string;
  paymentDate?: string;
  bookingDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketPayload {
  showtimeId: string;
  seats: IBookedSeat[];
  totalPrice: number;
}

export interface UpdateTicketStatusPayload {
  status: TicketStatus;
}