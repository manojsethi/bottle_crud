import { mongoose } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import { IsDefined, IsMongoId, IsString } from "class-validator";
export class FetchOrDeleteBottleViewModel {
  @Expose()
  @IsString()
  @IsDefined()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  bottle_id: string;
}
