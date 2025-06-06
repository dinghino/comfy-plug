import { z } from 'zod'

// Zod Schema
export const contactFormSchema = z.object({
  role: z.enum(['customer', 'retailer', 'supplier', 'investor', 'other'], {
    required_error: 'Please select your role.',
  }),
  alias: z.string().min(1, {
    message: 'Alias is required.',
  }),
  phone: z.string().optional(),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  // wantsUpdates: z.boolean().default(false),
})

export type ContactFormData = z.input<typeof contactFormSchema>
