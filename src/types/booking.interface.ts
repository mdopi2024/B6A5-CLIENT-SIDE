export interface CreateBookingPayload {
  roomId: string;
  checkInDate: string;   // format: YYYY-MM-DD
  checkOutDate: string;  // format: YYYY-MM-DD
  specialRequest?: string;
}

export interface IBooking {
  id: string;
  userId: string;
  roomId: string;

  checkInDate: string;   // ISO string
  checkOutDate: string;  // ISO string

  totalNights: number;
  totalPrice: string;

  bookingStatus: "PENDING" | "CONFIRMED" | "CANCELLED"; // তুমি চাইলে adjust করতে পারো
  paymentStatus: "UNPAID" | "PAID" | "FAILED";

  specialRequest: string;

  createdAt: string;
  updatedAt: string;

  user: {
    id: string;
    name: string;
    email: string;
  };

  room: {
    id: string;
    roomNumber: string;
    title: string;
    pricePerNight: number;
  };
}