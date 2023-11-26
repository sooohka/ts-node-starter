import { z } from "zod";

export const env = z.object({
  port: z.string().default("3000"),
});

env.parse(process.env);

export type envType = z.infer<typeof env>;
