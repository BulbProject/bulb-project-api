import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

import { RequirementResponse } from '../requirement-response';

export class RequestedNeed {
  @IsString()
  public id: string;

  @IsArray()
  @Type(() => RequirementResponse)
  @ValidateNested({
    each: true,
  })
  public requirementResponses: RequirementResponse[];
}
