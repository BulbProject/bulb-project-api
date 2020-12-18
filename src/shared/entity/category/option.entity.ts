/* eslint import/no-cycle: 0 */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { IsUnion } from '../../validators';

export class Option {
  @IsString()
  public id: string;

  @IsString()
  public title: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'number' }],
  })
  @IsUnion(['string', 'number'])
  public value: string | number;

  @IsString()
  @IsOptional()
  public relatedRequirementID?: string;
}
