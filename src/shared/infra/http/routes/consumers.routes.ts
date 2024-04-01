import { Router } from "express";
import multer from "multer";

import { RegisterConsumerController } from "../controllers/consumers/register-consumer/register-consumer-controller";
import { GetAllConsumersController } from "../controllers/consumers/get-all-consumers/get-all-consumers-controller";
import { ImportConsumerController } from "../controllers/consumers/import-consumer/import-consumer-controller";

const registerConsumerController = new RegisterConsumerController();
const importConsumerController = new ImportConsumerController();
const getAllConsumersController = new GetAllConsumersController();

const consumersRoutes = Router();
const upload = multer({
  dest: "./tmp",
});

consumersRoutes.post("/", registerConsumerController.handle);
consumersRoutes.post(
  "/import",
  upload.single("file"),
  importConsumerController.handle,
);

consumersRoutes.get("/list", getAllConsumersController.handle);

export { consumersRoutes };
