/* eslint import/no-cycle: 0 */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ArrayMinSize, ValidateNested } from 'class-validator';

import { IsUnion } from '../../validators';

import { Option } from './option.entity';

const optionGroupRelatesTo = [
  'placeOfPerformance',
  'contractPeriod',
  'minValue',
  'maxValue',
  'period',
  'value',
  'measure',
  'unit',
];

export class OptionGroup {
  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'number' }],
  })
  @IsUnion(['string', 'number'])
  public id: string | number;

  @ApiProperty({
    enum: optionGroupRelatesTo,
  })
  @IsUnion([optionGroupRelatesTo, 'string'])
  public relatesTo: OptionGroupRelatesTo;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Option)
  @ValidateNested({
    each: true,
  })
  public options: Option[];
}

type OptionGroupRelatesTo =
  | 'placeOfPerformance'
  | 'contractPeriod'
  | 'minValue'
  | 'maxValue'
  | 'period'
  | 'value'
  | 'measure'
  | 'unit'
  | string;
