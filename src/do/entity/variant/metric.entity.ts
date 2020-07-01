import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Observation } from './observation.entity';

export class Metric {
  @IsString()
  public id: string;

  @IsString()
  public title: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsArray()
  @Type(() => Observation)
  @ValidateNested({
    each: true,
  })
  public observations: Observation[];
}
