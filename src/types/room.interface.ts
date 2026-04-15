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