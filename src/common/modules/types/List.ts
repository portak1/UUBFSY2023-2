import { z } from "zod";
import { ItemSchema } from "./Item";
import { UserSchema } from "./User";

const ListSchema = z.object({
    id: z.string(),
    items: z.array(ItemSchema),
    users: z.array(z.object({
        user: UserSchema,
        isOwner: z.boolean(),
    })),
    name: z.string(),
})

export type List = z.infer<typeof ListSchema>;