import { Router } from "express";
import bottleRouter from "./routes";

const routerV1 = Router();
routerV1.use("/v1", bottleRouter);
export default routerV1;
