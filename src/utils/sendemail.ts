import { env } from "@/env";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const loadEnv = env;

export const sendContactEmail = async (
  data: ContactEmailData
): Promise<void> => {
  const serviceId = loadEnv.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = loadEnv.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = loadEnv.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    toast.error("EmailJS configuration is missing.");
    throw new Error("EmailJS environment variables are missing.");
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        time: new Date().toLocaleString(),
      },
      publicKey
    );

    toast.success("Your message has been sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error);
    toast.error("Something went wrong. Please try again.");
    throw error;
  }
};