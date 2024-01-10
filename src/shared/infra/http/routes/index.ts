import { Router } from "express";

import { consumersRoutes } from "./consumers.routes";

const routes = Router();

routes.use("/consumers", consumersRoutes);

export { routes };
