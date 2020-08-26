import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { IsUnion } from '../../validators';

const itemClassificationScheme = ['CPV', 'CPVS', 'GSIN', 'UNSPSC', 'CPC', 'OKDP', 'OKPD', 'CUCOP'] as const;

export class Classification {
  @ApiPropertyOptional({
    enum: itemClassificationScheme,
  })
  @IsUnion([itemClassificationScheme, 'string'])
  public scheme: ItemClassificationScheme;

  @IsString()
  public id: string;

  @IsString()
  public description: string;

  @IsString()
  @IsOptional()
  public uri?: string;
}

export type ItemClassificationScheme = 'CPV' | 'CPVS' | 'GSIN' | 'UNSPSC' | 'CPC' | 'OKDP' | 'OKPD' | 'CUCOP' | string;
