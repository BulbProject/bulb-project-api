import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsOptional, IsString, ArrayMinSize, ValidateNested } from 'class-validator';

import { IsUnion } from '../../validators';

import { RequirementGroup } from './requirement-group.entity';

export class Criterion {
  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'number' }],
  })
  @IsUnion(['string', 'number'])
  public id: string | number;

  @ApiProperty({
    enum: ['tenderer', 'item'],
  })
  @IsIn(['tenderer', 'item'])
  @IsOptional()
  public relatesTo?: 'tenderer' | 'item';

  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public description?: string;

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
