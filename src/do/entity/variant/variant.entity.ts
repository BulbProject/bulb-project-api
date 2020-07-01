import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

import { Value } from '../../../shared/entity';

import { Metric } from './metric.entity';

export class Variant {
  @IsString()
  public id: string;

  @IsString()
  public relatedItem: string;

  @IsInt()
  public quantity: number;

  @IsArray()
  @Type(() => Metric)
  @ValidateNested({
    each: true,
  })
  public metrics: Metric[];

  @IsOptional()
  @ValidateNested()
  public avgValue?: Value;

  @IsArray()
  @Type(() => String)
  @IsOptional()
  public relatedProducts?: string[];
}
