import refData from 'ref-data';
import { Variants } from 'ref-data/31500000-1';
import type { Criterion, RequirementGroup } from 'types/parts';
import { specifications } from 'lib/db/methods';

import errorBuilder from 'lib/error-builder';
import { generateId } from '../../../../../utils';

import { generateDocument } from './generate-document';

import type { SpecificationEngine } from '../../types';

const categoryId = '31500000-1';

// Name of the function is a name of current CPV code
const LightingEquipmentAndElectricLamps: SpecificationEngine = async ({
  category,
  version,
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

  const relatedItem = selectedVariant.relatedItem as Variants;
  const { techChars } = refData[categoryId];

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
    id: '010100',
    requirements: [],
  };

  efficacyRequirementsGroup.requirements.push(
    ...[
      {
        title: 'Максимальна номінальна потужність (Pmax)',
        expectedValue: +(0.6 * (0.88 * Math.sqrt(lightFlowValue) + 0.049 * lightFlowValue) * PmaxCor).toFixed(2),
        unit: {
          id: '',
          name: 'W',
        },
      },
      {
        title: 'Коефіцієнт коригування Pmax',
        expectedValue: +PmaxCor,
      },
    ].map(generateId('0101'))
  );

  const efficacyCriterion: Criterion = {
    id: '010000',
    title: 'Вимоги до ефективності',
    requirementGroups: [efficacyRequirementsGroup],
  };

  const functionalityRequirementsGroup: RequirementGroup = {
    id: '020100',
    requirements: [],
  };

  switch (relatedItem) {
    case Variants.Incandescent: {
      switch (lightFlowType) {
        case 'non-directional': {
          functionalityRequirementsGroup.requirements.push(
            ...[
              {
                title: 'Rated lifetime',
                dataType: 'integer' as const,
                minValue: 2000,
                unit: {
                  id: '',
                  name: 'h',
                },
              },
              {
                title: 'Lumen maintenance at 75% of rated average lifetime',
                dataType: 'integer' as const,
                minValue: 85,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Switching cycle before failure times then rated lifitime expressed in hours',
                dataType: 'integer' as const,
                minValue: 4 * techChars[Variants.Incandescent].timeRate,
              },
              {
                title: 'Starting time',
                dataType: 'number' as const,
                maxValue: 0.2,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Warm up to 60% of lumenus flux',
                dataType: 'number' as const,
                maxValue: 1,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Premature failure rate at 200 h',
                dataType: 'number' as const,
                maxValue: 5,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Power factor',
                dataType: 'number' as const,
                minValue: 0.95,
              },
            ].map(generateId('0201'))
          );

          break;
        }

        case 'directional':
        default: {
          functionalityRequirementsGroup.requirements.push(
            ...[
              {
                title: 'Rated lifetime',
                dataType: 'integer' as const,
                minValue: 2000,
                unit: {
                  id: '',
                  name: 'h',
                },
              },
              {
                title: 'Lumen maintenance at 75% of rated average lifetime',
                dataType: 'integer' as const,
                minValue: 80,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Switching cycle before failure times then rated lifitime expressed in hours',
                dataType: 'integer' as const,
                minValue: 4 * techChars[Variants.Incandescent].timeRate,
              },
              {
                title: 'Starting time',
                dataType: 'number' as const,
                maxValue: 0.2,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Warm up to 60% of lumenus flux',
                dataType: 'number' as const,
                maxValue: 1,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Premature failure rate at 200 h',
                dataType: 'number' as const,
                maxValue: 5,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Power factor',
                dataType: 'number' as const,
                minValue: power <= 25 ? 0.5 : 0.95,
              },
            ].map(generateId('0201'))
          );
        }
      }

      break;
    }

    case Variants.Halogen: {
      switch (lightFlowType) {
        case 'non-directional': {
          functionalityRequirementsGroup.requirements.push(
            ...[
              {
                title: 'Rated lifetime',
                dataType: 'integer' as const,
                minValue: 2000,
                unit: {
                  id: '',
                  name: 'h',
                },
              },
              {
                title: 'Lumen maintenance at 75% of rated average lifetime',
                dataType: 'integer' as const,
                minValue: 85,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Switching cycle before failure times then rated lifitime expressed in hours',
                dataType: 'integer' as const,
                minValue: 4 * techChars[Variants.Halogen].timeRate,
              },
              {
                title: 'Starting time',
                dataType: 'number' as const,
                maxValue: 0.2,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Warm up to 60% of lumenus flux',
                dataType: 'number' as const,
                maxValue: 1,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Premature failure rate at 200 h',
                dataType: 'number' as const,
                maxValue: 5,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Power factor',
                dataType: 'number' as const,
                minValue: 0.95,
              },
            ].map(generateId('0201'))
          );

          break;
        }

        case 'directional':
        default: {
          functionalityRequirementsGroup.requirements.push(
            ...[
              {
                title: 'Rated lifetime',
                dataType: 'integer' as const,
                minValue: 2000,
                unit: {
                  id: '',
                  name: 'h',
                },
              },
              {
                title: 'Lumen maintenance at 75% of rated average lifetime',
                dataType: 'integer' as const,
                minValue: 80,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Switching cycle before failure times then rated lifitime expressed in hours',
                dataType: 'integer' as const,
                minValue: 4 * techChars[Variants.Halogen].timeRate,
              },
              {
                title: 'Starting time',
                dataType: 'number' as const,
                maxValue: 0.2,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Warm up to 60% of lumenus flux',
                dataType: 'number' as const,
                maxValue: 1,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Premature failure rate at 200 h',
                dataType: 'number' as const,
                maxValue: 5,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Power factor',
                dataType: 'number' as const,
                minValue: power <= 25 ? 0.5 : 0.95,
              },
            ].map(generateId('0201'))
          );
        }
      }

      break;
    }

    case Variants.Fluorescent: {
      switch (lightFlowType) {
        case 'non-directional': {
          functionalityRequirementsGroup.requirements.push(
            ...[
              {
                title: 'Survival factor at 6000 h',
                dataType: 'number' as const,
                minValue: 0.7,
              },
              {
                title: 'Lumen maintenance at 2000 h',
                dataType: 'integer' as const,
                minValue: 88,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Lumen maintenance at 6000 h',
                dataType: 'integer' as const,
                minValue: 70,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Switching cycle before failure',
                dataType: 'integer' as const,
                minValue: 0,
                unit: {
                  id: '',
                  name: 'h',
                },
              },
              {
                title: 'Starting time',
                dataType: 'number' as const,
                maxValue: power >= 10 ? 1 : 1.5,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Warm up to 60% of lumenus flux',
                dataType: 'integer' as const,
                maxValue: 40,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Premature failure rate at 400 h',
                dataType: 'integer' as const,
                maxValue: 2,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'UVA + UVB radiation',
                dataType: 'integer' as const,
                maxValue: 2,
                unit: {
                  id: '',
                  name: 'kW/klm',
                },
              },
              {
                title: 'UVC radiation',
                dataType: 'number' as const,
                maxValue: 0.01,
                unit: {
                  id: '',
                  name: 'kW/klm',
                },
              },
              {
                title: 'Power factor',
                dataType: 'number' as const,
                minValue: power <= 25 ? 0.55 : 0.9,
                unit: {
                  id: '',
                  name: 'kW/klm',
                },
              },
              {
                title: 'Colour rendering (Ra)',
                dataType: 'integer' as const,
                maxValue: 80,
                unit: {
                  id: '',
                  name: 'Ra',
                },
              },
            ].map(generateId('0201'))
          );

          break;
        }

        case 'directional':
        default: {
          functionalityRequirementsGroup.requirements.push(
            ...[
              {
                title: 'Survival factor at 6000 h',
                dataType: 'number' as const,
                minValue: 0.7,
              },
              {
                title: 'Lumen maintenance at 2000 h',
                dataType: 'integer' as const,
                minValue: 83,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Lumen maintenance at 6000 h',
                dataType: 'integer' as const,
                minValue: 70,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Switching cycle before failure',
                dataType: 'integer' as const,
                minValue: 0,
                unit: {
                  id: '',
                  name: 'h',
                },
              },
              {
                title: 'Starting time',
                dataType: 'number' as const,
                maxValue: power >= 10 ? 1 : 1.5,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Warm up to 60% of lumenus flux',
                dataType: 'integer' as const,
                maxValue: 40,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Premature failure rate at  1000 h',
                dataType: 'integer' as const,
                maxValue: 5,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Power factor',
                dataType: 'number' as const,
                minValue: power <= 25 ? 0.55 : 0.9,
                unit: {
                  id: '',
                  name: 'kW/klm',
                },
              },
              {
                title: 'Colour rendering (Ra)',
                dataType: 'integer' as const,
                maxValue: 80,
                unit: {
                  id: '',
                  name: 'Ra',
                },
              },
            ].map(generateId('0201'))
          );
        }
      }

      break;
    }

    case Variants.LED:
    default: {
      functionalityRequirementsGroup.requirements.push(
        ...[
          {
            title: 'Survival factor at 6000 h',
            dataType: 'number' as const,
            minValue: 0.9,
          },
          {
            title: 'Lumen maintenance at 6000 h',
            dataType: 'integer' as const,
            minValue: 80,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            title: 'Switching cycle before failure',
            dataType: 'integer' as const,
            minValue: 0,
            unit: {
              id: '',
              name: 'h',
            },
          },
          {
            title: 'Starting time',
            dataType: 'number' as const,
            maxValue: 0.5,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            title: 'Warm up to 95% of lumenus flux',
            dataType: 'number' as const,
            maxValue: 2,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            title: 'Premature failure rate at 1000 h',
            dataType: 'integer' as const,
            maxValue: 5,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            title: 'Power factor',
            dataType: 'number' as const,
            minValue: (power >= 2 && power <= 5 ? 0.4 : power > 5 && power <= 25 ? 0.5 : power > 25 && 0.9) as number,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            title: 'Colour rendering (Ra)',
            dataType: 'integer' as const,
            minValue: 80,
            unit: {
              id: '',
              name: 'Ra',
            },
          },
        ].map(generateId('0201'))
      );
    }
  }

  const functionalityCriterion: Criterion = {
    id: '',
    title: 'Вимоги до функціональності',
    requirementGroups: [functionalityRequirementsGroup],
  };

  const criteria = [efficacyCriterion, functionalityCriterion];

  switch (egp) {
    case 'prozorro':
    default: {
      switch (mode) {
        case 'json': {
          return specifications.add(categoryId, version, criteria);
        }
        case 'docx':
        default: {
          return generateDocument(category, selectedVariant, criteria);
        }
      }
    }
  }

  throw errorBuilder(400, 'Something wrong...');
};

export default LightingEquipmentAndElectricLamps;
