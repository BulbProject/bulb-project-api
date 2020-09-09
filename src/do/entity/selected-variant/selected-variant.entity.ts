import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { RequirementResponse } from '../requirement-response';
import { Variant } from '../variant';

class SelectedVariant extends Variant {
  @IsArray()
  @Type(() => RequirementResponse)
  @ValidateNested({
    each: true,
  })
  public requirementResponses: RequirementResponse[];
}

export class SpecificationBody {
  @Type(() => SelectedVariant)
  @ValidateNested()
  public selectedVariant: SelectedVariant;
}
