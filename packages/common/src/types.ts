import {z} from "zod"

export const CreateUserSchema = z.object({
    name:z.string(),
    username:z.string().min(3,"username must be larger than 3 letters").max(20,"username must be less than 20 letters"),
    password:z.string().min(5,"password must be larger than 5 letters")

})