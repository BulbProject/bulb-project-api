import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

import { RequirementResponse } from '../requirement-response';

class RequestedNeedEntity {
  @IsString()
  public id: string;

  @IsArray()
  @Type(() => RequirementResponse)
  @ValidateNested({
    each: true,
  })
  public requirementResponses: RequirementResponse[];
}

export class RequestedNeed {
  @ValidateNested()
  @Type(() => RequestedNeedEntity)
  public requestedNeed: RequestedNeedEntity;
}
