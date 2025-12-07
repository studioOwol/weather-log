import { z } from "zod"

// 번역 키를 반환하는 스키마
export const loginSchema = z.object({
  email: z.email({ error: "validation.emailInvalid" }).check(
    z.minLength(1, { error: "validation.emailRequired" })
  ),
  password: z.string().check(z.minLength(1, { error: "validation.passwordRequired" })),
})

export const signupSchema = z
  .object({
    email: z.email({ error: "validation.emailInvalid" }).check(
      z.minLength(1, { error: "validation.emailRequired" })
    ),
    password: z.string().check(
      z.minLength(1, { error: "validation.passwordRequired" }),
      z.minLength(6, { error: "validation.passwordTooShort" })
    ),
    confirmPassword: z.string().check(
      z.minLength(1, { error: "validation.confirmPasswordRequired" })
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "validation.passwordMismatch",
    path: ["confirmPassword"],
  })

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
