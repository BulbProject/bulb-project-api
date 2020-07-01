/* eslint import/no-cycle: 0 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { IsUnion } from '../../validators';

import { Unit } from './unit.entity';

export class Option {
  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'number' }],
  })
  @IsUnion(['string', 'number'])
  public id: string | number;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'number' }],
  })
  @IsUnion(['string', 'number'])
  public value: string | number;

  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsNumber()
  @IsOptional()
  public minValue?: number;

  @IsNumber()
  @IsOptional()
  public maxValue?: number;

  @IsOptional()
  @ValidateNested()
  public unit?: Unit;
}
