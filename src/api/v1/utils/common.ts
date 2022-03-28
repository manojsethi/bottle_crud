import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

export class ValidationResult {
  data: any;
  error: any;
}
export class errorResult {
  message: String;
  Error: String;
}

class Utility {
  ValidateAndConvert = async (classToConvert: any, body: string) => {
    const result = new ValidationResult();
    result.data = plainToClass(classToConvert, body);
    await validate(result.data, { skipMissingProperties: true }).then(
      (errors) => {
        // errors is an array of validation errors
        if (errors.length > 0) {
          let errorTexts = new Array<string>();
          result.error = errors.map((err) => err.constraints);

          return result;
        }
      }
    );
    return result;
  };
}
export default new Utility();
