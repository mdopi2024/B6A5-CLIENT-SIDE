/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { createReview } from "@/actions/review.actions";
import { ICreateReviewInput } from "@/types/review.interface";

const zodForm = z.object({
    rating: z.number().min(1, "Please select a rating").max(5),
    comment: z.string().min(10, "Review must be at least 10 characters"),
});

const ReviewForm = () => {
    const router = useRouter();
    const { id } = useParams()

    const form = useForm({
        defaultValues: {
            rating: 0,
            comment: "",
        },
        validators: {
            onSubmit: zodForm,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Submitting your review...");
            try {
                const reviewData = { roomId: id, ...value };
                const result = await createReview(reviewData as ICreateReviewInput);

                if (!result.success) {
                    toast.error(result.message || "Failed to submit review. Please try again.", { id: toastId });
                    return; // ✅ এটা missing ছিল — না হলে error এর পরেও success toast দেখাত
                }

                toast.success("Review submitted! Thank you for your feedback 🌟", { id: toastId });
                router.back();
            } catch {
                toast.error("Something went wrong. Please try again later.", { id: toastId });
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
                        <span className="text-[26px]">⭐</span>
                    </div>
                    <h1 className="text-white text-[24px] font-bold leading-none">
                        Rate Your <span className="text-[#EF9F27]">Stay</span>
                    </h1>
                    <p className="text-white/50 text-[12px] uppercase tracking-widest">
                        Boshonto Hotel & Dining · Share your experience
                    </p>
                </CardHeader>

                <div className="h-px bg-gradient-to-r from-transparent via-[#EF9F27] to-transparent" />

                <CardContent className="px-8 pt-6 pb-2">
                    <form
                        id="review-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                    >
                        <FieldGroup>
                            <div className="flex flex-col gap-5">

                                {/* ⭐ Rating Field */}
                                <form.Field name="rating">
                                    {(field) => (
                                        <Field>
                                            <FieldLabel>Your Rating</FieldLabel>
                                            <div className="flex items-center gap-2 mt-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => field.handleChange(star)}
                                                        className="transition-transform hover:scale-110 focus:outline-none"
                                                    >
                                                        <span
                                                            className={`text-3xl ${star <= field.state.value
                                                                ? "text-[#EF9F27]"
                                                                : "text-[#042C53]/15"
                                                                }`}
                                                        >
                                                            ★
                                                        </span>
                                                    </button>
                                                ))}
                                                {field.state.value > 0 && (
                                                    <span className="text-[12px] text-[#042C53]/50 ml-1">
                                                        {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][field.state.value]}
                                                    </span>
                                                )}
                                            </div>
                                            <FieldError
                                                errors={field.state.meta.errors?.map((e: any) =>
                                                    typeof e === "string" ? e : e?.message ?? String(e)
                                                )}
                                            />
                                        </Field>
                                    )}
                                </form.Field>

                                {/* 💬 Comment Field */}
                                <form.Field name="comment">
                                    {(field) => (
                                        <Field>
                                            <FieldLabel>Your Review</FieldLabel>
                                            <Textarea
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Tell us about your experience..."
                                                rows={4}
                                                className="bg-[#FAFAFA] border-[#042C53]/10 rounded-lg text-sm resize-none"
                                            />
                                            <div className="flex justify-between items-center mt-1">
                                                <FieldError
                                                    errors={field.state.meta.errors?.map((e: any) =>
                                                        typeof e === "string" ? e : e?.message ?? String(e)
                                                    )}
                                                />
                                                <span className="text-[10px] text-[#042C53]/30 ml-auto">
                                                    {field.state.value.length} / 500
                                                </span>
                                            </div>
                                        </Field>
                                    )}
                                </form.Field>

                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>

                <CardFooter className="flex-col gap-3 px-8 pb-7 pt-4">
                    <Button
                        type="submit"
                        form="review-form"
                        className="w-full bg-[#042C53] hover:bg-[#0C447C] text-white"
                    >
                        Submit Review
                    </Button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="text-sm text-[#042C53]/50 hover:text-[#042C53] transition"
                    >
                        ← Go back
                    </button>
                </CardFooter>

                <div className="h-[3px] w-full bg-gradient-to-r from-[#EF9F27] to-[#042C53]" />
            </Card>
        </div>
    );
};

export default ReviewForm;