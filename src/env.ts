import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BACKEND_URL: z.string(),
    AUTH_URL: z.string(),
    API_URL: z.string(),
    FRONTEND_URL: z.string(),

  },
  client: {
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:z.string(),
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:z.string(),
      NEXT_PUBLIC_EMAILJS_SERVICE_ID:z.string()
  },

  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    AUTH_URL: process.env.AUTH_URL,
    API_URL: process.env.API_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  },
});