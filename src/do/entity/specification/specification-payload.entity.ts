import { Type } from 'class-transformer';
import { IsIn, IsString, ValidateNested } from 'class-validator';

import { Category } from '../../../shared/entity/category';
import type { Egp } from '../egp';
import type { Mode } from '../mode';
import { SelectedVariant } from '../selected-variant';

export class SpecificationPayload {
  @Type(() => Category)
  public category: Category;

  @IsString()
  public version: string;

  @Type(() => SelectedVariant)
  @ValidateNested()
  public selectedVariant: SelectedVariant;

  @IsIn(['prozorro'])
  public egp: Egp;

  @IsIn(['json', 'docx'])
  public mode: Mode;
}
