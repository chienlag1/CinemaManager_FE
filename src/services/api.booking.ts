export interface IBookedSeat {
  row: string;
  number: number;
}

export interface IBooking {
  seats: IBookedSeat[];
  _id?: string;
  user?: string;
  showtime?: string;
  totalPrice?: number;
  status?: 'paid' | 'unpaid';
}
