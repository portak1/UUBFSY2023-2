import {z} from "zod";

export const ItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    isCompleted: z.boolean(),
    itemCount: z.number(),
});


export type Item = z.infer<typeof ItemSchema>;
