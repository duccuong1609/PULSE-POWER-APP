import z from "zod";

export const schema = z.object({
  id: z.number(),
  invoice_id: z.string(),
  invoice_date: z.string(),
  customer_id: z.string(),
  product_id: z.string(),
  product_name: z.string().nullable(),
  quantity: z.number(),
  address: z.string().nullable(),
  customer_name: z.string().nullable(),
})