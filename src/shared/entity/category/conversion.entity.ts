import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { IsUnion } from '../../validators';

class Coefficient {
  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'number' }],
  })
  @IsUnion(['string', 'number'])
  public id: string | number;

  @IsUnion(['string', 'number', 'boolean'])
  @IsOptional()
  public value?: number | string | boolean;

  @IsNumber()
  @IsOptional()
  public minValue?: number;

  @IsNumber()
  @IsOptional()
  public maxValue?: number;

  @IsNumber()
  @IsOptional()
  public coefficient?: number;
}

const conversionRelatesTo = ['requirement', 'observation'];

export class Conversion {
  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'number' }],
  })
  @IsUnion(['string', 'number'])
  public id: string | number;

  @ApiProperty({
    enum: conversionRelatesTo,
  })
  @IsIn(conversionRelatesTo)
  @IsOptional()
  public relatesTo?: 'requirement' | 'observation';

  @IsString()
  @IsOptional()
  public rationale?: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsArray()
  @Type(() => Coefficient)
  @ValidateNested({
    each: true,
  })
  public coefficients: Coefficient[];

  @IsString()
  @IsOptional()
  public relatedItem?: string;
}
