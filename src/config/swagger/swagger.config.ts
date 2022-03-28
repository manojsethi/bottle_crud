import express, { Request, Response } from "express";
import * as fs from "fs";
import path from "path";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export class SwaggerConfig {
  private app: express.Application;
  constructor(app: express.Application) {
    this.app = app;
    this.setupSwagger();
  }
  setupSwagger = () => {
    // var tempDir = os.tmpdir();
    let tempDir = path.resolve();
    const swaggerDefinition: swaggerJSDoc.SwaggerDefinition = {
      openapi: "3.0.0",
      info: {
        title: "Bottle API Docs",
        version: "1.0",
      },
      contactInfo: {
        company: "Boffin Coders Pvt. Ltd.",
        website: "https://boffincoders.com",
      },
      servers: [],
    };

    const versions = ["v1"];
    const swaggerUiOptions: swaggerUi.SwaggerUiOptions = {
      swaggerUrls: [],
      swaggerOptions: {
        urls: [],
        validatorUrl: null,
      },
    };

    versions.map((v, index) => {
      swaggerUiOptions.swaggerUrls?.push(v.toUpperCase());
      swaggerUiOptions.swaggerOptions?.urls.push({
        name: v,
        url: `http://localhost:5000/swagger/${v}/swagger.json`,
      });
      swaggerDefinition.servers = [{ url: "/api/" + v }];
      swaggerDefinition.info.title = `Bottle API Docs ${v}`;
      swaggerDefinition.info.version = v;

      const options = {
        swaggerDefinition,
        apis: [`${tempDir}/src/api/${v}/**/*.ts`],
      };
      // initialize swagger-jsdoc
      const swaggerSpec = swaggerJSDoc(options);
      fs.mkdirSync(`${tempDir}/src/swagger/${v}/`, {
        recursive: true,
      });
      fs.writeFileSync(
        `${tempDir}/src/swagger/${v}/swagger.json`,
        JSON.stringify(swaggerSpec)
      );

      this.app.get(
        `${tempDir}/src/swagger/${v}/swagger.json`,
        (req: Request, res: Response) => {
          const fileContents = fs.readFileSync(
            `${tempDir}/src/swagger/${v}/swagger.json`,
            "utf8"
          );
          try {
            const data = JSON.parse(fileContents);
            res.send(data);
          } catch (err) {
            console.error(err);
          }
        }
      );
    });
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(undefined, swaggerUiOptions)
    );
  };
}
