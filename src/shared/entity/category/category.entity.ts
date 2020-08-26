import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ArrayMinSize, ValidateNested } from 'class-validator';

import { Classification } from './classification.entity';
import { Conversion } from './conversion.entity';
import { Criterion } from './criterion.entity';
import { Document } from './document.entity';
import { Item } from './item.entity';

export class Category {
  @IsString()
  public id: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @ValidateNested()
  @Type(() => Classification)
  public classification: Classification;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Item)
  @ValidateNested({
    each: true,
  })
  public items: Item[];

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Document)
  @ValidateNested({
    each: true,
  })
  public documents: Document[];

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Criterion)
  @ValidateNested({
    each: true,
  })
  public criteria: Criterion[];

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Conversion)
  @ValidateNested({
    each: true,
  })
  @IsOptional()
  public conversions?: Conversion[];
}
