export interface CreateRoomFormValues {
  roomNumber: string;
  floor: number;
  title: string;
  description: string;
  roomType: "SINGLE" | "DOUBLE" | "SUITE" | "DELUXE";
  bedType: "SINGLE" | "DOUBLE" | "QUEEN" | "KING";
  capacity: number;
  pricePerNight: number;
  images: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  roomType: "SINGLE" | "DOUBLE" | "SUITE";
  title: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  bedType: "SINGLE" | "DOUBLE" | "QUEEN" | "KING";
  images: string;
  status: "AVAILABLE" | "BOOKED" | "MAINTENANCE";
  floor: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}