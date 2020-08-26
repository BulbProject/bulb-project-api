import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsOptional, IsString, ArrayMinSize, ValidateNested } from 'class-validator';

import { RequirementGroup } from './requirement-group.entity';

export class Criterion {
  @IsString()
  public id: string;

  @IsString()
  public title: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    enum: ['tenderer', 'item'],
  })
  @IsIn(['tenderer', 'item'])
  @IsOptional()
  public relatesTo?: 'tenderer' | 'item';

  @IsString()
  @IsOptional()
  public relatedItem?: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => RequirementGroup)
  @ValidateNested({
    each: true,
  })
  public requirementGroups: RequirementGroup[];
}
