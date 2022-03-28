import cors from "cors";
import express, { Application } from "express";
import mongoose from "mongoose";
import routerV1 from "./api/v1";
import { SwaggerConfig } from "./config/swagger/swagger.config";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("src"));
app.use(cors());
let PORT = process.env.PORT ?? 5000;
let connectionString = process.env.CONNECTION_STRING ?? "";
(async () => {
  try {
    mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "sample_bottle",
      })
      .then((res: any) => console.log("connected"))
      .catch((err: any) => console.log(err));
  } catch (error) {
    console.log(error);
  }
})();
//swagger docs
//Swagger docs can only be seen if server is running on 5000 port;
new SwaggerConfig(app);
app.use(express.static("/api-docs"));
app.use("/api", routerV1);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
