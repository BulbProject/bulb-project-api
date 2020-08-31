import { BadRequestException } from '@nestjs/common';

import { RequirementResponse } from '../../do/entity/requirement-response';

export const getTariff = (requirementResponse: RequirementResponse): number | true => {
  const tariffValue = requirementResponse.value;
  const requirementReferenceId = requirementResponse.requirement.id;

  if (
    !['number', 'boolean'].includes(typeof tariffValue) ||
    (requirementReferenceId === '0401010000' && (typeof tariffValue !== 'number' || tariffValue <= 0)) ||
    (requirementReferenceId === '0402010000' && (typeof tariffValue !== 'boolean' || !tariffValue))
  ) {
    throw new BadRequestException(`Requirement responses for tariffs not valid.`);
  }

  return tariffValue as number | true;
};
