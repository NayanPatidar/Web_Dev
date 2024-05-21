import {z} from "zod"

export const usernameValidation = z
    .string()
    .min(2, "Username must have atleast 2 characters")
    .max(20, "Username must not be more than 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, "User must not contain any special characters")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({
        message: "Invalid Email Address"
    }),
    password: z.string().min(6, {message: "The password must be at least 6 characters"})
})

