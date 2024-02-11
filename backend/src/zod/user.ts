import {z} from "zod";

export const checkSignUp = z.object({
    username: z.string().email().min(5),
    password: z.string().min(6),
    firstname: z.string().max(10),
    lastname: z.string().max(10)
})

export const checkSignIn = z.object({
    username: z.string().email().min(5),
    password: z.string().min(6),
})

export const checkUpdate = z.object({
    password: z.string().min(6),
    firstname: z.string().max(10),
    lastname: z.string().max(10)
})

