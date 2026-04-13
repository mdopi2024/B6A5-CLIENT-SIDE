/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { createManager } from "@/actions/auth.actions";

const zodForm = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const CreateManager = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },

    validators: {
      onSubmit: zodForm,
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating manager account...");
      try {
        
        const data = await createManager(value);
        if (data?.error) {
          toast.error(data.message || "Manager creation failed", { id: toastId });
          return;
        }

        toast.success(data.message || "Manager account created successfully!", { id: toastId });
        router.push("/admin-dashboard/users");
      } catch {
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

        <div className="h-[3px] w-full bg-gradient-to-r from-[#042C53] to-[#EF9F27]" />

        <CardHeader className="bg-[#042C53] border px-8 pt-5 pb-6 text-center flex flex-col items-center space-y-2">

          <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#EF9F27]/10 border border-[#EF9F27]/40">
            <span className="text-[26px]">🛡️</span>
          </div>

          <h1 className="text-white text-[28px] font-bold leading-none">
            Create <span className="text-[#EF9F27]">Manager</span>
          </h1>

          <p className="text-white/50 text-[12px] uppercase tracking-widest">
            Boshonto Hotel & Dining · Manager Access
          </p>
        </CardHeader>

        <div className="h-px bg-gradient-to-r from-transparent via-[#EF9F27] to-transparent" />

        <CardContent className="px-8 pt-6 pb-2">
          <form
            id="create-manager-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="flex flex-col gap-4">

                <form.Field name="name">
                  {(field) => (
                    <Field>
                      <FieldLabel>Manager Full Name</FieldLabel>
                      <Input
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter manager full name"
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

                <form.Field name="email">
                  {(field) => (
                    <Field>
                      <FieldLabel>Manager Email Address</FieldLabel>
                      <Input
                        type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter manager email"
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

                <form.Field name="password">
                  {(field) => (
                    <Field>
                      <FieldLabel>Manager Password</FieldLabel>
                      <Input
                        type="password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Min. 8 characters"
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

              </div>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-4 px-8 pb-7 pt-4">

          <Button
            type="submit"
            form="create-manager-form"
            className="w-full bg-[#042C53] hover:bg-[#0C447C] text-white"
          >
            Create Manager Account
          </Button>

          <p className="text-sm text-center text-[#042C53]/60">
            Back to{" "}
            <Link href="/" className="text-[#EF9F27] font-semibold">
              Home page
            </Link>
          </p>

        </CardFooter>

        <div className="h-[3px] w-full bg-gradient-to-r from-[#EF9F27] to-[#042C53]" />
      </Card>
    </div>
  );
};

export default CreateManager;