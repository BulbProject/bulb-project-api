import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { IsUnion } from '../../validators';

class Coefficient {
  @IsString()
  public id: string;

  @IsUnion(['string', 'number', 'boolean'])
  public value: number | string | boolean;

  @IsNumber()
  @IsOptional()
  public minValue?: number;

  @IsNumber()
  @IsOptional()
  public maxValue?: number;

  @IsNumber()
  public coefficient: number;
}

const conversionRelatesTo = ['requirement'];

export class Conversion {
  @IsString()
  public id: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    enum: conversionRelatesTo,
  })
  @IsIn(conversionRelatesTo)
  public relatesTo: 'requirement';

  @IsString()
  @IsOptional()
  public relatedItem?: string;

  @IsString()
  @IsOptional()
  public rationale?: string;

  @IsArray()
  @Type(() => Coefficient)
  @ValidateNested({
    each: true,
  })
  public coefficients: Coefficient[];
}
