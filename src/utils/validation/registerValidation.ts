import z from "zod";


export const registerValidation = z.object({
    name:z.string().max(10,"name can not be 10 char"),
    email:z.string().email(),
    password:z.string() 
})