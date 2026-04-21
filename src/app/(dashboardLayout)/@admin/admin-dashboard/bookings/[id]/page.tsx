/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getBookingById, updateBookingStatus } from "@/actions/booking.action";

// 👉 তোমার BookingStatus enum অনুযায়ী
const zodForm = z.object({
  bookingStatus: z.enum(
    ["PENDING", "CONFIRMED", "CANCELLED", "CHECKED_IN", "CHECKED_OUT"],
    {
      error: "Please select a valid booking status",
    }
  ),
});

const statuses = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "CHECKED_IN",
  "CHECKED_OUT",
];

const UpdateBookingStatusForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [bookingStatus, setBookingStatus] = useState<string>("");

  // ⚠️ এখানে তুমি পরে API call বসাবে (getBookingById)
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const { data } = await getBookingById(id as string);
        setBookingStatus(data.bookingStatus);
      } catch (error) {
        console.error("Failed to fetch booking:", error);
      }
    };

    fetchBooking();
  }, [id]);

  const form = useForm({
    defaultValues: {
      bookingStatus: bookingStatus,
    },
    validators: {
      onSubmit: zodForm,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating booking status...");
      try {
        console.log(value)
        // 👉 এখানে তোমার backend action বসবে
        const data = await updateBookingStatus(id as string, value);

        if (!data.success) {
          toast.error(data.message || "Failed to update booking status.", { id: toastId });
          return;
        }

        toast.success("Booking status updated successfully!", { id: toastId });
        router.push("/admin-dashboard/bookings");
      } catch (error: any) {
        toast.error(error.message || "Failed to update booking status.", { id: toastId });
      }
    },
  });

  return (
    <div
      className="min-h-screen bg-[#F1EFE8] flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(4,44,83,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <Card className="w-full max-w-sm gap-0 bg-white border border-[#042C53]/10 rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(4,44,83,0.10)] p-0">

        <div className="h-[3px] w-full bg-gradient-to-r from-[#042C53] to-[#EF9F27]" />

        <CardHeader className="bg-[#042C53] px-8 pt-5 pb-6 text-center flex flex-col items-center space-y-2">
          <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#EF9F27]/10 border border-[#EF9F27]/40">
            <ShieldCheck className="w-7 h-7 text-[#EF9F27]" />
          </div>
          <h1 className="text-white text-[24px] font-bold leading-none">
            Update <span className="text-[#EF9F27]">Booking Status</span>
          </h1>
          <p className="text-white/50 text-[12px] uppercase tracking-widest">
            Hotel & Dining · Booking Control
          </p>
        </CardHeader>

        <div className="h-px bg-gradient-to-r from-transparent via-[#EF9F27] to-transparent" />

        <CardContent className="px-8 pt-6 pb-2">
          <form
            id="update-booking-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="bookingStatus">
                {(field) => (
                  <Field>
                    <FieldLabel className="text-[#042C53] font-semibold text-sm mb-3 block">
                      Select Booking Status
                    </FieldLabel>

                    <div className="flex flex-col gap-3">
                      {statuses.map((status) => {
                        const isSelected = field.state.value === status;

                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => field.handleChange(status)}
                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200
                              ${
                                isSelected
                                  ? "border-[#042C53] bg-[#042C53] shadow-md"
                                  : "border-[#042C53]/15 bg-[#042C53]/3 hover:border-[#042C53]/40 hover:bg-[#042C53]/6"
                              }`}
                          >
                            <p
                              className={`font-bold text-sm tracking-wide ${
                                isSelected ? "text-white" : "text-[#042C53]"
                              }`}
                            >
                              {status.replace("_", " ")}
                            </p>

                            <div
                              className={`h-4 w-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                                ${
                                  isSelected
                                    ? "border-[#EF9F27] bg-[#EF9F27]"
                                    : "border-[#042C53]/25"
                                }`}
                            >
                              {isSelected && (
                                <div className="h-1.5 w-1.5 rounded-full bg-[#042C53]" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <FieldError
                      errors={field.state.meta.errors?.map((e: any) =>
                        typeof e === "string" ? e : e?.message ?? String(e)
                      )}
                    />
                  </Field>
                )}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-3 px-8 pb-7 pt-4">
          <Button
            type="submit"
            form="update-booking-form"
            className="w-full bg-[#042C53] hover:bg-[#0C447C] text-white font-semibold"
          >
            <ShieldCheck className="h-4 w-4 mr-2" />
            Update Status
          </Button>

          <Link
            href="/admin-dashboard/bookings"
            className="w-full inline-flex items-center justify-center px-4 py-1 rounded-lg border border-[#042C53]/20 text-[#042C53]/70 hover:bg-[#042C53]/5 text-sm font-semibold transition-all duration-200"
          >
            Cancel
          </Link>
        </CardFooter>

        <div className="h-[3px] w-full bg-gradient-to-r from-[#EF9F27] to-[#042C53]" />
      </Card>
    </div>
  );
};

export default UpdateBookingStatusForm;