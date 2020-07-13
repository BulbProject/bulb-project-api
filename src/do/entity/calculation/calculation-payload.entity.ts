import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

import { Category } from '../../../shared/entity/category';
import { RequestedNeed } from '../requested-need';

export class CalculationPayload {
  @Type(() => Category)
  @ValidateNested()
  public category: Category;

  @IsString()
  public version: string;

  @Type(() => RequestedNeed)
  @ValidateNested()
  public requestedNeed: RequestedNeed;
}
