import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ArrayMinSize, ValidateNested } from 'class-validator';

import { Requirement } from './requirement.entity';

export class RequirementGroup {
  @IsString()
  public id: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Requirement)
  @ValidateNested({
    each: true,
  })
  public requirements: Requirement[];
}
