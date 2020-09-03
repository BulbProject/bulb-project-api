import { BadRequestException } from '@nestjs/common';

import type { CalculationPayload, CalculationResponse } from './calculation';
import type { SpecificationPayload, SpecificationResponse } from './specification';
import type { RequirementResponse } from './requirement-response';

interface ModeOfUse {
  hoursInDay: number;
  daysInWeek: number;
}

export abstract class AlgorithmEngine {
  public readonly categoryId: string;

  public getTariff(requirementResponses: RequirementResponse[], criterionNumber: string): number | void {
    const tariffResponses = requirementResponses.filter(({ requirement }) => {
      return requirement.id.startsWith(criterionNumber);
    });

    if (tariffResponses.length !== 1) {
      throw new BadRequestException(`Incorrect tariffs information provided.`);
    }

    const tariffValue = tariffResponses[0].value;
    const requirementReferenceId = tariffResponses[0].requirement.id;

    if (
      !['number', 'boolean'].includes(typeof tariffValue) ||
      (requirementReferenceId === '0401010000' && (typeof tariffValue !== 'number' || tariffValue <= 0)) ||
      (requirementReferenceId === '0402010000' && (typeof tariffValue !== 'boolean' || !tariffValue))
    ) {
      throw new BadRequestException(`Requirement responses for tariffs not valid.`);
    }

    if (typeof tariffValue === 'number') {
      return tariffValue;
    }
  }

  public getModeOfUse(requirementResponses: RequirementResponse[], criterionNumber: string): ModeOfUse | void {
    const modeOfUseResponses = requirementResponses.filter(({ requirement }) => {
      return requirement.id.startsWith(criterionNumber);
    });

    if (modeOfUseResponses.length === 0) {
      throw new BadRequestException(`Mode of use responses must be provided.`);
    }

    const modeOfUseResponsesIsConsistent = modeOfUseResponses.every(({ requirement }) => {
      return modeOfUseResponses[0].requirement.id.slice(2, 4) === requirement.id.slice(2, 4);
    });

    if (!modeOfUseResponsesIsConsistent) {
      throw new BadRequestException(
        `Requirement responses for mode of use are given from different requirement groups.`
      );
    }

    if (modeOfUseResponses[0].requirement.id.slice(2, 4) === '01') {
      const hoursInDay = modeOfUseResponses.find(({ requirement }) => requirement.id.slice(4, 6) === '01')?.value;
      const daysInWeek = modeOfUseResponses.find(({ requirement }) => requirement.id.slice(4, 6) === '02')?.value;

      if (typeof hoursInDay !== 'number' || hoursInDay <= 0 || hoursInDay > 24) {
        throw new BadRequestException('Incorrect working hours per day provided.');
      }

      if (typeof daysInWeek !== 'number' || daysInWeek <= 0 || daysInWeek > 7) {
        throw new BadRequestException('Incorrect working days per week provided.');
      }

      return { hoursInDay, daysInWeek };
    }
  }

  public abstract getCalculation(payload: CalculationPayload): Promise<CalculationResponse>;

  public abstract getSpecification(payload: SpecificationPayload): SpecificationResponse;
}
