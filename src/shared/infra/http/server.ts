import { app } from "./app";
import { env } from "@/env";

app.listen(env.PORT, () =>
  console.log(`NODE SERVER IS RUNNING ON PORT: ${env.PORT}`),
);
