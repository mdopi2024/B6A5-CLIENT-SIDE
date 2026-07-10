"use client";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CarFront,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-slate-50">
      {/* Hero */}
   <section className="border-b border-slate-200 bg-white">
  <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center lg:px-8">
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#EF9F27]/30 bg-[#EF9F27]/10 px-4 py-2 text-sm font-medium text-[#EF9F27]">
      <CarFront size={18} />
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

            <form className="mt-8 space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    First Name
                  </label>

                  <input
                    type="text"
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
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#EF9F27] focus:ring-2 focus:ring-[#EF9F27]/20"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Reservation Issue"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#EF9F27] focus:ring-2 focus:ring-[#EF9F27]/20"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#EF9F27] focus:ring-2 focus:ring-[#EF9F27]/20"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#042C53] py-4 font-semibold text-white transition hover:bg-[#063b6d]"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* Contact Information */}

          <div className="space-y-6">
            <div className="rounded-3xl bg-[#042C53] p-8 text-white shadow-xl">
              <h2 className="text-3xl font-bold">
                Contact Information
              </h2>

              <p className="mt-3 text-slate-300">
                Reach out to us through any of the following channels.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-[#EF9F27] p-3">
                    <Mail />
                  </div>

                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-slate-300">
                      support@parkora.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-[#EF9F27] p-3">
                    <Phone />
                  </div>

                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-slate-300">
                      +880 1234-567890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-[#EF9F27] p-3">
                    <MapPin />
                  </div>

                  <div>
                    <h3 className="font-semibold">Office</h3>
                    <p className="text-slate-300">
                      Chattogram, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
              <div className="mb-5 flex items-center gap-3">
                <Clock className="text-[#EF9F27]" />

                <h3 className="text-2xl font-bold text-[#042C53]">
                  Business Hours
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
              </div>
            </div>

            {/* FAQ */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#042C53]">
                Frequently Asked
              </h3>

              <div className="mt-6 space-y-5">
                <div>
                  <h4 className="font-semibold text-[#042C53]">
                    How long does support take?
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
                    Yes, from your dashboard before your reservation starts.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-[#042C53]">
                    Is Parkora available 24/7?
                  </h4>

                  <p className="mt-1 text-slate-600">
                    Parking reservations are available anytime through the
                    platform.
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