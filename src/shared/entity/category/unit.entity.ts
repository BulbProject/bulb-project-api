/* eslint import/no-cycle: 0 */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { IsUnion } from '../../validators';

import { Value } from './value.entity';

const unitClassificationScheme = ['UNCEFACT', 'QUDT'];

export class Unit {
  @ApiProperty({
    enum: unitClassificationScheme,
  })
  @IsUnion([unitClassificationScheme, 'string'])
  @IsOptional()
  public scheme?: UnitClassificationScheme;

  @IsString()
  @IsOptional()
  public id?: string;

  @IsString()
  @IsOptional()
  public name?: string;

  @IsOptional()
  @ValidateNested()
  public value?: Value;

  @IsString()
  @IsOptional()
  public uri?: string;
}

/**
 * The list from which identifiers for units of measure are taken,
 * using the open [unitClassificationScheme](https://standard.open-contracting.org/1.1/en/schema/codelists/#unit-classification-scheme) codelist.
 * 'UNCEFACT' is recommended.
 */
export type UnitClassificationScheme = 'UNCEFACT' | 'QUDT' | string;
