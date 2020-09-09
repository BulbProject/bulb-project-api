/* eslint import/no-cycle: 0 */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { IsUnion } from '../../validators';

const unitClassificationScheme = ['UNCEFACT', 'QUDT'];

export class Unit {
  @IsString()
  public id: string;

  @ApiProperty({
    enum: unitClassificationScheme,
  })
  @IsUnion([unitClassificationScheme, 'string'])
  @IsOptional()
  public scheme?: UnitClassificationScheme;

  @IsString()
  public name: string;

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
