import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { RequirementResponse } from '../requirement-response';
import { Variant } from '../variant';

class SelectedVariantEntity extends Variant {
  @IsArray()
  @Type(() => RequirementResponse)
  @ValidateNested({
    each: true,
  })
  public requirementResponses: RequirementResponse[];
}

export class SelectedVariant {
  @ValidateNested()
  public selectedVariant: SelectedVariantEntity;
}
