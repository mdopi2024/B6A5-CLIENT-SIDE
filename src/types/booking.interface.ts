export interface CreateBookingPayload {
  roomId: string;
  checkInDate: string;   // format: YYYY-MM-DD
  checkOutDate: string;  // format: YYYY-MM-DD
  specialRequest?: string;
}