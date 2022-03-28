import { mongoose } from "@typegoose/typegoose";
import { Expose, Type } from "class-transformer";
import {
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";
export class UpdateBottleViewModel {
  @Expose()
  @IsString()
  @IsDefined()
  @IsMongoId()
  @Type(() => mongoose.Types.ObjectId)
  bottle_id: string;

  @IsOptional()
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  name?: string;

  @IsOptional()
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  brand?: string;

  @IsOptional()
  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  capacity?: number;
}
