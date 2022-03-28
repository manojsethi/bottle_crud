import { getModelForClass, prop } from "@typegoose/typegoose";
/**
 * Schema for bottle database model
 */
export class Bottle {
  @prop()
  name: string;

  @prop()
  capacity: string;

  @prop()
  brand: string;
}

const BottleModel = getModelForClass(Bottle);
export default BottleModel;
