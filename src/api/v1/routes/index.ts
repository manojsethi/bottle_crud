import { Router } from "express";
import "reflect-metadata";
import bottleController from "../controller/bottel.controller";
const bottleRouter = Router();

bottleRouter
  .route("/bottle")
  .post(bottleController.addBottle)
  .get(bottleController.getBottlesList)
  .delete(bottleController.deleteBottle)
  .put(bottleController.updateBottle);

bottleRouter.get("/bottle/:bottle_id", bottleController.getBottleDetails);
export default bottleRouter;
