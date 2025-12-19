import { type } from "arktype";

export const planSchema = type("'free' | 'pro'");
export type Plan = typeof planSchema.infer;

export const billingPeriodSchema = type("'monthly' | 'yearly'");
export type BillingPeriod = typeof billingPeriodSchema.infer;

export const createSourceSchema = type({
  name: "string",
  url: "string",
});

export type CreateSource = typeof createSourceSchema.infer;

export const stringSchema = type("string");
