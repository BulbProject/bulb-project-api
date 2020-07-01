import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { IsUnion } from '../../../shared/validators';

import { RequirementReference } from './requirement-reference.entity';

export class RequirementResponse {
  @IsString()
  public id: string;

  @IsUnion(['string', 'number', 'boolean'])
  @IsOptional()
  public value?: string | number | boolean;

  @ValidateNested()
  @Type(() => RequirementReference)
  public requirement: RequirementReference;
}
