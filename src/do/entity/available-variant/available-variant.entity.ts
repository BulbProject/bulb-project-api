import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

import { Criterion } from '../../../shared/entity';

import { Variant } from '../variant';

export class AvailableVariant extends Variant {
  @IsArray()
  @Type(() => Criterion)
  @IsOptional()
  @ValidateNested({
    each: true,
  })
  public criteria: Criterion[];
}
