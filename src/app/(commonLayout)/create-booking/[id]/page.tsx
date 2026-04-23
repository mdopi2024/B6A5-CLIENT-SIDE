/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";
import { CreateBookingPayload } from "@/types/booking.interface";
import { createBooking } from "@/actions/booking.action";


const schema = z.object({
    checkInDate: z.string().min(1, "Check-in required"),
    checkOutDate: z.string().min(1, "Check-out required"),
     specialRequest: z.string(), 
}).refine(
    (d) => new Date(d.checkOutDate) > new Date(d.checkInDate),
    { message: "Check-out must be after check-in", path: ["checkOutDate"] }
);

export default function BookingPage() {
    const router = useRouter()
    const { id } = useParams();

    const session = authClient.useSession()

    useEffect(() => {
        if (!session.data) {
            router.push("/login");
        }
    }, [session.data, router]);


    const today = new Date().toISOString().split("T")[0];

    const form = useForm({
        defaultValues: {
            checkInDate: "",
            checkOutDate: "",
            specialRequest: "",
        },
        validators: {
            onSubmit: schema,
        },

        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating booking...");

            try {
                const bookingData = {
                    ...value, 
                    roomId: id
                }
            
                 const result= await createBooking(bookingData as CreateBookingPayload)
                 console.log(result)
                if (!result.success) {
                  toast.error(result.message || "Booking failed", { id: toastId });
                  return;
                }

                toast.success("Redirecting to payment...", { id: toastId });

                window.location.href = result.data.paymentUrl;

            } catch (err: any) {
                toast.error("Something went wrong", { id: toastId });
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

                {/* TOP LINE */}
                <div className="h-[3px] w-full bg-gradient-to-r from-[#042C53] to-[#EF9F27]" />

                {/* HEADER (same style as login) */}
                <CardHeader className="bg-[#042C53] border px-8 pt-5 pb-6 text-center flex flex-col items-center space-y-2">

                    <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#EF9F27]/10 border border-[#EF9F27]/40">
                        <span className="text-[26px]">🏨</span>
                    </div>

                    <h1 className="text-white text-[28px] font-bold leading-none">
                        Book a <span className="text-[#EF9F27]">Room</span>
                    </h1>

                    <p className="text-white/50 text-[12px] uppercase tracking-widest">
                        Boshonto Hotel · Reserve your stay
                    </p>

                </CardHeader>

                <div className="h-px bg-gradient-to-r from-transparent via-[#EF9F27] to-transparent" />

                {/* FORM */}
                <CardContent className="px-8 pt-6 pb-2">
                    <form
                        id="booking-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                    >
                        <FieldGroup>
                            <div className="flex flex-col gap-4">

                                {/* CHECK IN */}
                                <form.Field name="checkInDate">
                                    {(field) => (
                                        <Field>
                                            <FieldLabel>Check-in Date</FieldLabel>
                                            <Input
                                                type="date"
                                                min={today}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                className="bg-[#FAFAFA] border-[#042C53]/10 rounded-lg text-sm"
                                            />
                                            <FieldError
                                                errors={field.state.meta.errors?.map((e: any) =>
                                                    typeof e === "string" ? e : e?.message ?? String(e)
                                                )}
                                            />
                                        </Field>
                                    )}
                                </form.Field>

                                {/* CHECK OUT */}
                                <form.Field name="checkOutDate">
                                    {(field) => (
                                        <Field>
                                            <FieldLabel>Check-out Date</FieldLabel>
                                            <Input
                                                type="date"
                                                min={today}
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                className="bg-[#FAFAFA] border-[#042C53]/10 rounded-lg text-sm"
                                            />
                                            <FieldError
                                                errors={field.state.meta.errors?.map((e: any) =>
                                                    typeof e === "string" ? e : e?.message ?? String(e)
                                                )}
                                            />
                                        </Field>
                                    )}
                                </form.Field>

                                {/* SPECIAL REQUEST */}
                                <form.Field name="specialRequest">
                                    {(field) => (
                                        <Field>
                                            <FieldLabel>
                                                Special Request{" "}
                                                <span className="text-[#042C53]/40 font-normal">
                                                    (optional)
                                                </span>
                                            </FieldLabel>

                                            <Textarea
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Extra pillows, early check-in..."
                                                className="bg-[#FAFAFA] border-[#042C53]/10 rounded-lg text-sm resize-none"
                                                rows={3}
                                            />

                                            <FieldError
                                                errors={field.state.meta.errors?.map((e: any) =>
                                                    typeof e === "string" ? e : e?.message ?? String(e)
                                                )}
                                            />
                                        </Field>
                                    )}
                                </form.Field>

                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>

                {/* BUTTON */}
                <CardFooter className="flex-col gap-4 px-8 pb-7 pt-4">
                    <Button
                        type="submit"
                        form="booking-form"
                        className="w-full bg-[#042C53] hover:bg-[#0C447C] text-white"
                    >
                        Confirm & Pay
                    </Button>
                </CardFooter>

                <div className="h-[3px] w-full bg-gradient-to-r from-[#EF9F27] to-[#042C53]" />
            </Card>
        </div>
    );
}