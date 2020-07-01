/* eslint import/no-cycle: 0 */
import { Type } from 'class-transformer';
import { IsArray, ArrayMinSize, ValidateNested } from 'class-validator';

import { OptionGroup } from './option-group.entity';

export class OptionDetails {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => OptionGroup)
  @ValidateNested({
    each: true,
  })
  public optionGroups: OptionGroup[];
}
