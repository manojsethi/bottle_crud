import { Expose, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class AddBottleViewModel {
  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  name!: string;

  @Expose()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  brand!: string;

  @Expose()
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  capacity!: number;
}
