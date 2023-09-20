/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createEnv } from "@t3-oss/env-nextjs";
import getConfig from "next/config";
import { z } from "zod";


const { publicRuntimeConfig } = getConfig();

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    CLERK_SECRET_KEY: z.string().min(1),
    CLERK_WEBHOOK_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    KV_URL: z.string().min(1),
    KV_REST_API_URL: z.string().min(1),
    KV_REST_API_TOKEN: z.string().min(1),
    KV_REST_API_READ_ONLY_TOKEN: z.string().min(1),
    UPLOADTHING_SECRET: z.string().min(1),
    UPLOADTHING_APP_ID: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    STRIPE_PRO_MONTHLY_PRICE_ID: z.string().min(1),
    STRIPE_PRO_YEARLY_PRICE_ID: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1),
    NEXT_PUBLIC_URL: z.string(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  },

  runtimeEnv: {
    DATABASE_URL: publicRuntimeConfig.DATABASE_URL,
    NODE_ENV: publicRuntimeConfig.NODE_ENV || "production",
    CLERK_SECRET_KEY: publicRuntimeConfig.CLERK_SECRET_KEY,
    CLERK_WEBHOOK_SECRET: publicRuntimeConfig.CLERK_WEBHOOK_SECRET,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    publicRuntimeConfig.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: publicRuntimeConfig.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: publicRuntimeConfig.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
    publicRuntimeConfig.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
    publicRuntimeConfig.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    NEXT_PUBLIC_URL: publicRuntimeConfig.NEXT_PUBLIC_URL,
    RESEND_API_KEY: publicRuntimeConfig.RESEND_API_KEY,
    KV_URL: publicRuntimeConfig.KV_URL,
    KV_REST_API_URL: publicRuntimeConfig.KV_REST_API_URL,
    KV_REST_API_TOKEN: publicRuntimeConfig.KV_REST_API_TOKEN,
    KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
    UPLOADTHING_SECRET: publicRuntimeConfig.UPLOADTHING_SECRET,
    UPLOADTHING_APP_ID: publicRuntimeConfig.UPLOADTHING_APP_ID,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
    publicRuntimeConfig.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: publicRuntimeConfig.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: publicRuntimeConfig.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRO_MONTHLY_PRICE_ID: publicRuntimeConfig.STRIPE_PRO_MONTHLY_PRICE_ID,
    STRIPE_PRO_YEARLY_PRICE_ID: publicRuntimeConfig.STRIPE_PRO_YEARLY_PRICE_ID,
  },

  skipValidation: !!publicRuntimeConfig.SKIP_ENV_VALIDATION,
});
