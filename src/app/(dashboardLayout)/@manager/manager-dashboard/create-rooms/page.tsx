/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createRoom } from "@/actions/room.action";
import { CreateRoomFormValues } from "@/types/room.interface";



// ✅ All fields are string-based to match defaultValues — no coercion in schema
const zodForm = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  floor: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  roomType: z.enum(["SINGLE", "DOUBLE", "SUITE", "DELUXE"]),
  bedType: z.enum(["SINGLE", "DOUBLE", "QUEEN", "KING"]),
  capacity: z.string().min(1, "Capacity is required"),
  pricePerNight: z.string().min(1, "Price is required"),
  images: z.string(),
});

const CreateRooms = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      roomNumber: "",
      floor: "",
      title: "",
      description: "",
      roomType: "SINGLE" as "SINGLE" | "DOUBLE" | "SUITE" | "DELUXE",
      bedType: "SINGLE" as "SINGLE" | "DOUBLE" | "QUEEN" | "KING",
      capacity: "",
      pricePerNight: "",
      images: "",
    },
    validators: { onSubmit: zodForm},
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating room...");
      try {
        // ✅ Coerce numbers here manually
        const payload = {
          ...value,
          floor: value.floor ? Number(value.floor) : undefined,
          capacity: Number(value.capacity),
          pricePerNight: Number(value.pricePerNight),
        };
        const result = await createRoom(payload as CreateRoomFormValues)
        if (!result?.success) {
          toast.error(result?.message || "Failed to create room", { id: toastId });
          return;
        }
        toast.success(result?.message || "Room created successfully!", { id: toastId });
        form.reset();
      } catch {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <div
      className="min-h-screen bg-[#F1EFE8] flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(4,44,83,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <Card className="w-full max-w-[560px] gap-0 bg-white border border-[#042C53]/10 rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(4,44,83,0.10)] p-0">

        <div className="h-[3px] w-full bg-gradient-to-r from-[#042C53] to-[#EF9F27]" />

        {/* Header */}
        <CardHeader className="bg-[#042C53] px-6 sm:px-7 py-5 flex flex-row items-center gap-4 space-y-0 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
          />
          <div className="relative z-10 w-[46px] h-[46px] rounded-xl bg-[#EF9F27]/12 border border-[#EF9F27]/30 flex items-center justify-center text-xl flex-shrink-0">
            🛏️
          </div>
          <div className="relative z-10">
            <h1 className="text-white text-lg font-semibold leading-tight">Create New Room</h1>
            <p className="text-white/40 text-[11px] uppercase tracking-widest mt-0.5">
              Boshonto Hotel & Dining · Room Management
            </p>
          </div>
        </CardHeader>

        <div className="h-px bg-gradient-to-r from-transparent via-[#EF9F27]/40 to-transparent" />

        {/* Form */}
        <CardContent className="px-5 sm:px-7 pt-6 pb-2">
          <form id="create-room-form" onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
            <FieldGroup>
              <div className="flex flex-col gap-6">

                <SectionLabel title="Basic Information" />
                <div className="flex flex-col gap-4 -mt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField form={form} name="roomNumber" label="Room Number" placeholder="e.g. 101" type="number" />
                    <FormField form={form} name="floor" label="Floor" placeholder="e.g. 1" type="number" />
                  </div>

                  <FormField form={form} name="title" label="Title" placeholder="e.g. Deluxe Ocean View Room" />

                  <form.Field name="description">
                    {(field) => (
                      <Field>
                        <FieldLabel className="text-xs font-semibold text-[#042C53]">Description</FieldLabel>
                        <textarea
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Describe the room features..."
                          rows={3}
                          className="w-full bg-[#F1EFE8] border border-[#042C53]/10 rounded-xl px-3 py-2.5 text-sm text-[#042C53] placeholder:text-[#B4B2A9] outline-none resize-none focus:border-[#042C53]/30"
                        />
                      </Field>
                    )}
                  </form.Field>
                </div>

                <SectionLabel title="Room Details" />
                <div className="flex flex-col gap-4 -mt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <SelectField form={form} name="roomType" label="Room Type" options={["SINGLE","DOUBLE","SUITE","DELUXE"]} />
                    <SelectField form={form} name="bedType" label="Bed Type" options={["SINGLE","DOUBLE","QUEEN","KING"]} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField form={form} name="capacity" label="Capacity" placeholder="e.g. 2" type="number" />
                    <FormField form={form} name="pricePerNight" label="Price / Night (৳)" placeholder="e.g. 5000" type="number" />
                  </div>
                </div>

                <SectionLabel title="Room Images" />
                <div className="-mt-2">
                  <FormField form={form} name="images" label="Image URL (Optional)" placeholder="https://example.com/room.jpg" />
                </div>

              </div>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="px-5 sm:px-7 pb-6 pt-4">
          <Button
            type="submit"
            form="create-room-form"
            className="w-full bg-[#042C53] hover:bg-[#0C447C] text-[#EF9F27]"
          >
            Create Room
          </Button>
        </CardFooter>

        <div className="h-[3px] w-full bg-gradient-to-r from-[#EF9F27] to-[#042C53]" />
      </Card>
    </div>
  );
};

const SectionLabel = ({ title }: { title: string }) => (
  <div className="flex items-center gap-3">
    <span className="text-[10px] uppercase tracking-[0.12em] text-[#B4B2A9] font-medium whitespace-nowrap">
      {title}
    </span>
    <div className="flex-1 h-px bg-[#042C53]/08" />
  </div>
);

const FormField = ({ form, name, label, placeholder, type = "text" }: any) => (
  <form.Field name={name}>
    {(field: any) => (
      <Field>
        <FieldLabel className="text-xs font-semibold text-[#042C53]">{label}</FieldLabel>
        <Input
          type={type}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          placeholder={placeholder}
          className="bg-[#F1EFE8] border-[#042C53]/10 rounded-xl text-sm placeholder:text-[#B4B2A9] focus:border-[#042C53]/30"
        />
        <FieldError
          errors={field.state.meta.errors?.map((e: any) =>
            typeof e === "string" ? e : e?.message ?? String(e)
          )}
        />
      </Field>
    )}
  </form.Field>
);

const SelectField = ({ form, name, label, options }: any) => (
  <form.Field name={name}>
    {(field: any) => (
      <Field>
        <FieldLabel className="text-xs font-semibold text-[#042C53]">{label}</FieldLabel>
        <select
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          className="w-full bg-[#F1EFE8] border border-[#042C53]/10 rounded-xl px-3 h-9 text-sm text-[#042C53] outline-none focus:border-[#042C53]/30 cursor-pointer"
        >
          {options.map((opt: string) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <FieldError
          errors={field.state.meta.errors?.map((e: any) =>
            typeof e === "string" ? e : e?.message ?? String(e)
          )}
        />
      </Field>
    )}
  </form.Field>
);

export default CreateRooms;