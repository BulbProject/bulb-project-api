import refData, { BulbVariants } from 'ref-data';

import errorBuilder from 'lib/error-builder';

import { Criterion, RequirementGroup } from 'types/parts';
import { SpecificationEngine } from '../../types';

const categoryId = '31500000-1';

// Name of the function is a name of current CPV code
const LightingEquipmentAndElectricLamps: SpecificationEngine = ({
  selectedVariant: { selectedVariant },
  egp,
  mode,
}) => {
  if (!(categoryId in refData)) {
    throw errorBuilder(
      400,
      `Can't make a specification for the item with id - '${selectedVariant.relatedItem}'. No reference data.`
    );
  }

  const relatedItem: BulbVariants = selectedVariant.relatedItem as BulbVariants;
  const techChars = refData[categoryId].techChars;

  const directionalLightFlowResponses = selectedVariant.requirementResponses.filter(({ requirement: { id } }) => {
    return /^01/.test(id);
  });

  if (directionalLightFlowResponses.length !== 1 || typeof directionalLightFlowResponses[0].value !== 'boolean') {
    throw errorBuilder(400, `Not correct provided information about directional light.`);
  }

  const lightFlowType =
    /^0101/.test(directionalLightFlowResponses[0].requirement.id) && directionalLightFlowResponses[0].value
      ? 'directional'
      : 'non-directional';

  const power = selectedVariant.metrics
    .find((metric) => metric.id === '0100')
    ?.observations.find((observation) => observation.id === '0101')?.measure;

  if (typeof power !== 'number' || power <= 0) {
    throw errorBuilder(400, `Power of bulb not transferred or it value 0 or less.`);
  }

  const lightFlowValue = power * techChars[relatedItem]?.lumPerWatt;

  const PmaxCor = lightFlowValue >= 60 && lightFlowValue <= 450 ? 1.84 : 1;

  const efficacyRequirementsGroup: RequirementGroup = {
    id: '',
    requirements: [],
  };

  efficacyRequirementsGroup.requirements.push({
    id: '',
    title: 'Maximum rated power (Pmax) for a given rated luminous flux (Φ)',
    expectedValue: +(0.6 * (0.88 * Math.sqrt(lightFlowValue) + 0.049 * lightFlowValue) * PmaxCor).toFixed(2),
    unit: {
      id: '',
      name: 'W',
    },
  });

  const efficacyCriterion: Criterion = {
    id: '',
    title: 'Efficacy Requirements',
    requirementGroups: [efficacyRequirementsGroup],
  };

  const functionallyRequirementsGroup: RequirementGroup = {
    id: '',
    requirements: [],
  };

  if (relatedItem === BulbVariants.Incandescent) {
    if (lightFlowType === 'non-directional') {
      functionallyRequirementsGroup.requirements.push(
        //@ts-ignore
        ...[
          {
            id: '',
            title: 'Rated lifetime',
            dataType: 'integer',
            minValue: 2000,
            unit: {
              id: '',
              name: 'h',
            },
          },
          {
            id: '',
            title: 'Lumen maintenance at 75% of rated average lifetime',
            dataType: 'integer',
            minValue: 85,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '',
            title: 'Switching cycle before failure times then rated lifitime expressed in hours',
            dataType: 'integer',
            minValue: 4 * techChars[BulbVariants.Incandescent].timeRate,
          },
          {
            id: '',
            title: 'Starting time',
            dataType: 'number',
            maxValue: 0.2,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '',
            title: 'Warm up to 60% of lumenus flux',
            dataType: 'number',
            maxValue: 1,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '',
            title: 'Premature failure rate at 200 h',
            dataType: 'number',
            maxValue: 5,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '',
            title: 'Power factor',
            dataType: 'number',
            minValue: 0.95,
          },
        ]
      );
    }

    if (lightFlowType === 'directional') {
      functionallyRequirementsGroup.requirements.push(
        //@ts-ignore
        ...[
          {
            id: '',
            title: 'Rated lifetime',
            dataType: 'integer',
            minValue: 2000,
            unit: {
              id: '',
              name: 'h',
            },
          },
          {
            id: '',
            title: 'Lumen maintenance at 75% of rated average lifetime',
            dataType: 'integer',
            minValue: 80,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '',
            title: 'Switching cycle before failure times then rated lifitime expressed in hours',
            dataType: 'integer',
            minValue: 4 * techChars[BulbVariants.Incandescent].timeRate,
          },
          {
            id: '',
            title: 'Starting time',
            dataType: 'number',
            maxValue: 0.2,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '',
            title: 'Warm up to 60% of lumenus flux',
            dataType: 'number',
            maxValue: 1,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '',
            title: 'Premature failure rate at 200 h',
            dataType: 'number',
            maxValue: 5,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '',
            title: 'Power factor',
            dataType: 'number',
            minValue: power <= 25 ? 0.5 : 0.95,
          },
        ]
      );
    }
  }

  if (relatedItem === BulbVariants.Halogen) {
    if (lightFlowType === 'non-directional') {
      functionallyRequirementsGroup.requirements.push(
        //@ts-ignore
        ...[
          {
            id: '',
            title: 'Rated lifetime',
            dataType: 'integer',
            minValue: 2000,
            unit: {
              id: '',
              name: 'h',
            },
          },
          {
            id: '',
            title: 'Lumen maintenance at 75% of rated average lifetime',
            dataType: 'integer',
            minValue: 85,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '',
            title: 'Switching cycle before failure times then rated lifitime expressed in hours',
            dataType: 'integer',
            minValue: 4 * techChars[BulbVariants.Halogen].timeRate,
          },
          {
            id: '',
            title: 'Starting time',
            dataType: 'number',
            maxValue: 0.2,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '',
            title: 'Warm up to 60% of lumenus flux',
            dataType: 'number',
            maxValue: 1,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '',
            title: 'Premature failure rate at 200 h',
            dataType: 'number',
            maxValue: 5,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '',
            title: 'Power factor',
            dataType: 'number',
            minValue: 0.95,
          },
        ]
      );
    }

    if (lightFlowType === 'directional') {
      functionallyRequirementsGroup.requirements.push(
        //@ts-ignore
        ...[
          {
            id: '',
            title: 'Rated lifetime',
            dataType: 'integer',
            minValue: 2000,
            unit: {
              id: '',
              name: 'h',
            },
          },
          {
            id: '',
            title: 'Lumen maintenance at 75% of rated average lifetime',
            dataType: 'integer',
            minValue: 80,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '',
            title: 'Switching cycle before failure times then rated lifitime expressed in hours',
            dataType: 'integer',
            minValue: 4 * techChars[BulbVariants.Halogen].timeRate,
          },
          {
            id: '',
            title: 'Starting time',
            dataType: 'number',
            maxValue: 0.2,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '',
            title: 'Warm up to 60% of lumenus flux',
            dataType: 'number',
            maxValue: 1,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '',
            title: 'Premature failure rate at 200 h',
            dataType: 'number',
            maxValue: 5,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '',
            title: 'Power factor',
            dataType: 'number',
            minValue: power <= 25 ? 0.5 : 0.95,
          },
        ]
      );
    }
  }

  if (relatedItem === BulbVariants.Fluorescent) {
    if (lightFlowType === 'non-directional') {
      functionallyRequirementsGroup.requirements.push(
        //@ts-ignore
        ...[
          {
            id: '',
            title: 'Survival factor at 6000 h',
            dataType: 'number',
            minValue: 0.7,
          },
          {
            id: '',
            title: 'Lumen maintenance at 2000 h',
            dataType: 'integer',
            minValue: 88,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '',
            title: 'Lumen maintenance at 6000 h',
            dataType: 'integer',
            minValue: 70,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '',
            title: 'Switching cycle before failure',
            dataType: 'integer',
            minValue: 0,
            unit: {
              id: '',
              name: 'h',
            },
          },
          {
            id: '',
            title: 'Starting time',
            dataType: 'number',
            maxValue: power >= 10 ? 1 : 1.5,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '',
            title: 'Warm up to 60% of lumenus flux',
            dataType: 'integer',
            maxValue: 40,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '',
            title: 'Premature failure rate at 400 h',
            dataType: 'integer',
            maxValue: 2,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '',
            title: 'UVA + UVB radiation',
            dataType: 'integer',
            maxValue: 2,
            unit: {
              id: '',
              name: 'kW/klm',
            },
          },
          {
            id: '',
            title: 'UVC radiation',
            dataType: 'number',
            maxValue: 0.01,
            unit: {
              id: '',
              name: 'kW/klm',
            },
          },
          {
            id: '',
            title: 'Power factor',
            dataType: 'number',
            minValue: power <= 25 ? 0.55 : 0.9,
            unit: {
              id: '',
              name: 'kW/klm',
            },
          },
          {
            id: '',
            title: 'Colour rendering (Ra)',
            dataType: 'integer',
            maxValue: 80,
            unit: {
              id: '',
              name: 'Ra',
            },
          },
        ]
      );
    }

    if (lightFlowType === 'directional') {
      functionallyRequirementsGroup.requirements.push(
        //@ts-ignore
        ...[
          {
            id: '',
            title: 'Survival factor at 6000 h',
            dataType: 'number',
            minValue: 0.7,
          },
          {
            id: '',
            title: 'Lumen maintenance at 2000 h',
            dataType: 'integer',
            minValue: 83,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '',
            title: 'Lumen maintenance at 6000 h',
            dataType: 'integer',
            minValue: 70,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '',
            title: 'Switching cycle before failure',
            dataType: 'integer',
            minValue: 0,
            unit: {
              id: '',
              name: 'h',
            },
          },
          {
            id: '',
            title: 'Starting time',
            dataType: 'number',
            maxValue: power >= 10 ? 1 : 1.5,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '',
            title: 'Warm up to 60% of lumenus flux',
            dataType: 'integer',
            maxValue: 40,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '',
            title: 'Premature failure rate at  1000 h',
            dataType: 'integer',
            maxValue: 5,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '',
            title: 'Power factor',
            dataType: 'number',
            minValue: power <= 25 ? 0.55 : 0.9,
            unit: {
              id: '',
              name: 'kW/klm',
            },
          },
          {
            id: '',
            title: 'Colour rendering (Ra)',
            dataType: 'integer',
            maxValue: 80,
            unit: {
              id: '',
              name: 'Ra',
            },
          },
        ]
      );
    }
  }

  if (relatedItem === BulbVariants.LED) {
    functionallyRequirementsGroup.requirements.push(
      //@ts-ignore
      ...[
        {
          id: '',
          title: 'Survival factor at 6000 h',
          dataType: 'number',
          minValue: 0.9,
        },
        {
          id: '',
          title: 'Lumen maintenance at 6000 h',
          dataType: 'integer',
          minValue: 80,
          unit: {
            id: '',
            name: '%',
          },
        },
        {
          id: '',
          title: 'Switching cycle before failure',
          dataType: 'integer',
          minValue: 0,
          unit: {
            id: '',
            name: 'h',
          },
        },
        {
          id: '',
          title: 'Starting time',
          dataType: 'number',
          maxValue: 0.5,
          unit: {
            id: '',
            name: 's',
          },
        },
        {
          id: '',
          title: 'Warm up to 95% of lumenus flux',
          dataType: 'number',
          maxValue: 2,
          unit: {
            id: '',
            name: 's',
          },
        },
        {
          id: '',
          title: 'Premature failure rate at 1000 h',
          dataType: 'integer',
          maxValue: 5,
          unit: {
            id: '',
            name: '%',
          },
        },
        {
          id: '',
          title: 'Power factor',
          dataType: 'number',
          minValue: (power >= 2 && power <= 5 ? 0.4 : power > 5 && power <= 25 ? 0.5 : power > 25 && 0.9) as number,
          unit: {
            id: '',
            name: '%',
          },
        },
        {
          id: '',
          title: 'Colour rendering (Ra)',
          dataType: 'integer',
          minValue: 80,
          unit: {
            id: '',
            name: 'Ra',
          },
        },
      ]
    );
  }

  const functionallyCriterion: Criterion = {
    id: '',
    title: 'Functionality Requirements',
    requirementGroups: [functionallyRequirementsGroup],
  };

  if (egp === 'prozorro' || mode === 'json') {
    return [efficacyCriterion, functionallyCriterion];
  }
};

export default LightingEquipmentAndElectricLamps;
