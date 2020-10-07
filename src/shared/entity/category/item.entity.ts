import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ArrayMinSize, ValidateNested, IsObject } from 'class-validator';

import { Classification } from './classification.entity';

export class Item {
  @IsString()
  public id: string;

  @IsString()
  public description: string;

  @IsObject()
  @Type(() => Classification)
  @ValidateNested()
  public classification: Classification;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Classification)
  @ValidateNested({
    each: true,
  })
  @IsOptional()
  public additionalClassifications?: Classification[];
}
