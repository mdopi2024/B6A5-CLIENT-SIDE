"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Hotel,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { sendContactEmail } from "@/utils/sendemail";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

type Status = "idle" | "loading";

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): string | null => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      return "Please enter your first and last name.";
    }
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      return "Please enter a valid email address.";
    }
    if (!form.subject.trim()) {
      return "Please enter a subject.";
    }
    if (!form.message.trim()) {
      return "Please enter a message.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setStatus("loading");

    try {
      await sendContactEmail({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      });

      setForm(initialState);
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className="">
      {/* Hero */}
      <section className="border-b border-slate-200 ">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#EF9F27]/30 bg-[#EF9F27]/10 px-4 py-2 text-sm font-medium text-[#EF9F27]">
            <Hotel size={18} />
            Boshonto Hotel & Dining
          </div>

          <h1 className="text-4xl font-bold text-[#042C53] md:text-5xl lg:text-6xl">
            Contact Us
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Whether you have a question about room reservations, dining, events,
            or our services, our friendly team is always ready to assist you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-[#042C53]">
              Send us a Message
            </h2>

            <p className="mt-2 text-slate-500">
              Fill out the form below and we will respond as soon as possible.
            </p>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#EF9F27] focus:ring-2 focus:ring-[#EF9F27]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#EF9F27] focus:ring-2 focus:ring-[#EF9F27]/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#EF9F27] focus:ring-2 focus:ring-[#EF9F27]/20"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+880 1234-567890"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#EF9F27] focus:ring-2 focus:ring-[#EF9F27]/20"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Room Reservation Inquiry"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#EF9F27] focus:ring-2 focus:ring-[#EF9F27]/20"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Message
                </label>

                <textarea
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#EF9F27] focus:ring-2 focus:ring-[#EF9F27]/20"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#EF9F27] text-white py-3 hover:bg-[#d88f1d] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    Sending...
                    <Loader2 size={18} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#042C53]/10 bg-white p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-[#042C53]">
                Contact Information
              </h2>

              <p className="mt-3 text-slate-500">
                Reach out to us through any of the following channels.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-[#EF9F27]/10 p-3">
                    <Mail className="text-[#EF9F27]" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#042C53]">Email</h3>
                    <p className="text-slate-500">
                      reservations@boshontohotel.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-[#EF9F27]/10 p-3">
                    <Phone className="text-[#EF9F27]" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#042C53]">Phone</h3>
                    <p className="text-slate-500">
                      +880 1234-567890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-[#EF9F27]/10 p-3">
                    <MapPin className="text-[#EF9F27]" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#042C53]">Address</h3>
                    <p className="text-slate-500">
                      Chattogram, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="rounded-3xl border border-slate-200 p-8 shadow-lg">
              <div className="mb-5 flex items-center gap-3">
                <Clock className="text-[#EF9F27]" />

                <h3 className="text-2xl font-bold text-[#042C53]">
                  Front Desk Hours
                </h3>
              </div>

              <div className="space-y-3 text-slate-600">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>

                <p className="pt-2 text-sm text-slate-400">
                  Check-in and check-out support is available 24/7 for guests.
                </p>
              </div>
            </div>

            {/* FAQ */}
            <div className="rounded-3xl border border-slate-200 p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#042C53]">
                Frequently Asked
              </h3>

              <div className="mt-6 space-y-5">
                <div>
                  <h4 className="font-semibold text-[#042C53]">
                    How long does support take to respond?
                  </h4>

                  <p className="mt-1 text-slate-600">
                    Usually within 24 hours.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#042C53]">
                    Can I cancel my reservation?
                  </h4>

                  <p className="mt-1 text-slate-600">
                    Yes, from your dashboard before your check-in date.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#042C53]">
                    Do you offer airport pickup?
                  </h4>

                  <p className="mt-1 text-slate-600">
                    Yes, on request — just mention it in your reservation notes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}