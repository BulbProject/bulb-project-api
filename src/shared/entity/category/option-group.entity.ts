/* eslint import/no-cycle: 0 */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ArrayMinSize, ValidateNested } from 'class-validator';

import { IsUnion } from '../../validators';

import { Option } from './option.entity';

const optionGroupRelatesTo = ['value'];

export class OptionGroup {
  @IsString()
  public id: string;

  @ApiProperty({
    enum: optionGroupRelatesTo,
  })
  @IsUnion([optionGroupRelatesTo, 'string'])
  public relatesTo: 'value';

  @IsString()
  public description: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Option)
  @ValidateNested({
    each: true,
  })
  public options: Option[];
}
