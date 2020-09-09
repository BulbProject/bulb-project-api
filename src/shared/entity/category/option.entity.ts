/* eslint import/no-cycle: 0 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { IsUnion } from '../../validators';

import { Unit } from './unit.entity';

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
