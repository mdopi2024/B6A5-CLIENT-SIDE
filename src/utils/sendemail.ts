import emailjs from "@emailjs/browser";

export interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (
  data: ContactEmailData
): Promise<void> => {
  const serviceId = "service_3df9qqj";
  const templateId = "template_59llp9g";
  const publicKey = "Q9d3XCSKak1DDPg6C";

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS environment variables are missing.");
  }

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
};