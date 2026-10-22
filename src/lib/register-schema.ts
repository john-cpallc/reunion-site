import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  preferredName: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  cityState: z.string().trim().max(120).optional().or(z.literal("")),
  gradNote: z.string().trim().max(200).optional().or(z.literal("")),
  hearAbout: z.string().trim().max(200).optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((value) => value === true, {
      message: "Consent is required to join the mailing list",
    }),
  /** Honeypot — must stay empty */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type RegisterInput = z.infer<typeof registerSchema>;
