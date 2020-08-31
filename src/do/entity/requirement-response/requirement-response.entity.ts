import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, IsString, ValidateNested } from 'class-validator';

import { IsUnion } from 'shared/validators';

import { RequirementReference } from './requirement-reference.entity';

export class RequirementResponse {
  @IsString()
  public id: string;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }, { type: 'integer' }],
  })
  @IsUnion(['string', 'number', 'boolean', 'integer'])
  public value?: string | number | boolean;

  @IsObject()
  @ValidateNested()
  @Type(() => RequirementReference)
  public requirement: RequirementReference;
}
