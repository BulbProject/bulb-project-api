import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { IsUnion } from '../../validators';

const itemClassificationScheme = ['CPV', 'CPVS', 'GSIN', 'UNSPSC', 'CPC', 'OKDP', 'OKPD', 'CUCOP'] as const;

export class Classification {
  @ApiPropertyOptional({
    enum: itemClassificationScheme,
    isArray: true,
  })
  @IsUnion([itemClassificationScheme, 'string'])
  @IsOptional()
  public scheme?: ItemClassificationScheme;

  @ApiPropertyOptional({
    oneOf: [{ type: 'string' }, { type: 'number' }],
    isArray: true,
  })
  @IsUnion(['string', 'number'])
  @IsOptional()
  public id?: string | number;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsString()
  @IsOptional()
  public uri?: string;
}

export type ItemClassificationScheme = 'CPV' | 'CPVS' | 'GSIN' | 'UNSPSC' | 'CPC' | 'OKDP' | 'OKPD' | 'CUCOP' | string;
