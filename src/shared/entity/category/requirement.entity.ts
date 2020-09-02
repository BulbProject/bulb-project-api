/* eslint import/no-cycle: 0 */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsOptional, IsString, ValidateNested } from 'class-validator';
import { DataType } from 'ts4ocds/extensions/requirements';

import { ExpectedValue, IsUnion, OptionValue } from 'shared/validators';

import { OptionDetails } from './option-details.entity';
import { Unit } from './unit.entity';

const dataType = ['string', 'number', 'integer', 'boolean'];

export class Requirement {
  @IsString()
  public id: string;

  @IsString()
  public title: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    enum: dataType,
  })
  @IsIn(dataType)
  public dataType: DataType;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }],
  })
  @IsUnion(['string', 'number', 'integer', 'boolean'])
  @IsOptional()
  @ExpectedValue()
  public expectedValue?: string | number | boolean;

  @IsUnion(['number', 'integer'])
  @IsOptional()
  @ExpectedValue()
  public minValue?: number;

  @IsUnion(['number', 'integer'])
  @IsOptional()
  @ExpectedValue()
  public maxValue?: number;

  @IsOptional()
  @ValidateNested()
  public unit?: Unit;

  @IsOptional()
  @ValidateNested()
  @Type(() => OptionDetails)
  @OptionValue()
  public optionDetails?: OptionDetails;
}
