import {z} from "zod"

export const AcceptMessageSchema = z.object({
    acceptSchema: z.boolean(),
})