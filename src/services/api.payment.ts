import api from "./api.axios";

// services/api.payment.ts
export const paymentApiService = {
  createTicketAndPay: async (payload: {
    showtimeId: string;
    seats: { row: string; number: number }[];
    totalPrice: number;
    returnUrl: string;
    cancelUrl: string;
  }) => {
const res = await api.post('/tickets/create-and-pay', {
 showtime: payload.showtimeId,
      seats: payload.seats,
      totalPrice: payload.totalPrice,
      returnUrl: payload.returnUrl,
      cancelUrl: payload.cancelUrl,
    });
    return res.data;
  },
};
