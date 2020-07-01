import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ArrayMinSize, ValidateNested } from 'class-validator';

import { IsUnion } from '../../validators';

import { Classification } from './classification.entity';

export class Item {
  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'number' }],
  })
  @IsUnion(['string', 'number'])
  public id: string | number;

  @IsString()
  @IsOptional()
  public description?: string;

  @ValidateNested()
  public classification?: Classification;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Classification)
  @ValidateNested({
    each: true,
  })
  public additionalClassifications?: Classification[];
}
