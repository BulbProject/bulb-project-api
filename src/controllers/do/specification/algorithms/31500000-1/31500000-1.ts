import refData from 'ref-data';
import { Variants } from 'ref-data/31500000-1';
import type { Criterion, Requirement, RequirementGroup } from 'types/parts';

import axios from 'axios';
import { getTableConfig } from 'api';

import * as csv from 'csv-string';

import { specifications } from 'lib/db/methods';
import RequestError from 'lib/request-error';
import { generateId, getAlgorithmId } from 'utils';

import { generateDocument } from './generate-document';

import type { SpecificationEngine } from '../../types';
import type { TechCharacteristics } from 'ref-data/31500000-1';

const categoryId = getAlgorithmId(__filename);

// Name of the function is a name of current CPV code
const LightingEquipmentAndElectricLamps: SpecificationEngine = async ({
  category,
  version,
  selectedVariant: { selectedVariant },
  egp,
  mode,
}) => {
  if (!(categoryId in refData)) {
    throw new RequestError(
      400,
      `Can't make a specification for the item with id - '${selectedVariant.relatedItem}'. No reference data.`
    );
  }

  const relatedItem = selectedVariant.relatedItem as Variants;

  let directoryCsv = '';

  try {
    const { data } = await axios.request<{ content: string }>(getTableConfig('directory', categoryId));

    directoryCsv = data.content;
  } catch (e) {
    throw new RequestError(500, 'Failed to get reference data for calculation');
  }

  const directoryTable = csv.parse(directoryCsv);

  const techChars = directoryTable.reduce((_techChars, row) => {
    if (!/^.+\/.+$/.test(row[0])) return _techChars;

    const bulbType = row[0].replace(/\/.+$/, '').replace('/', '') as Variants;
    const techCharName = row[0].replace(/^.+\//, '').replace('/', '');

    return {
      ..._techChars,
      [bulbType]: {
        ...(_techChars[bulbType] || {}),
        [techCharName]: row[1],
      },
    };
  }, {} as TechCharacteristics);

  const directionalLightFlowResponses = selectedVariant.requirementResponses.filter(({ requirement: { id } }) => {
    return /^01/.test(id);
  });

  if (
    directionalLightFlowResponses.length !== 1 ||
    typeof directionalLightFlowResponses[0].value !== 'boolean' ||
    !directionalLightFlowResponses[0].value
  ) {
    throw new RequestError(400, `Not correct provided information about directional light.`);
  }

  const efficacyRequirementsBaseId = '0101';
  const functionalityRequirementsBaseId = '0201';

  const lightFlowType =
    new RegExp(efficacyRequirementsBaseId).test(directionalLightFlowResponses[0].requirement.id) &&
    directionalLightFlowResponses[0].value
      ? 'directional'
      : 'non-directional';

  const power = selectedVariant.metrics
    .find((metric) => metric.id === '0100')
    ?.observations.find((observation) => observation.id === efficacyRequirementsBaseId)?.measure;

  if (typeof power !== 'number' || power <= 0) {
    throw new RequestError(400, `Power of bulb not transferred or it value 0 or less.`);
  }

  const lightFlowValue = power * techChars[relatedItem]?.lumPerWatt;

  const PmaxCor = lightFlowValue >= 60 && lightFlowValue <= 450 ? 1.84 : 1;

  const efficacyRequirementsGroup: RequirementGroup = {
    id: `${efficacyRequirementsBaseId}00`,
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
    ].map(generateId(efficacyRequirementsBaseId))
  );

  const efficacyCriterion: Criterion = {
    id: '010000',
    title: 'Вимоги до ефективності',
    requirementGroups: [efficacyRequirementsGroup],
  };

  const functionalityRequirementsGroup: RequirementGroup = {
    id: `${functionalityRequirementsBaseId}00`,
    requirements: [],
  };

  switch (relatedItem) {
    case Variants.Incandescent: {
      switch (lightFlowType) {
        case 'non-directional': {
          functionalityRequirementsGroup.requirements.push(
            ...([
              {
                title: 'Rated lifetime',
                dataType: 'integer',
                minValue: 2000,
                unit: {
                  id: '',
                  name: 'h',
                },
              },
              {
                title: 'Lumen maintenance at 75% of rated average lifetime',
                dataType: 'integer',
                minValue: 85,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Switching cycle before failure times then rated lifitime expressed in hours',
                dataType: 'integer',
                minValue: 4 * techChars[Variants.Incandescent].timeRate,
              },
              {
                title: 'Starting time',
                dataType: 'number',
                maxValue: 0.2,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Warm up to 60% of lumenus flux',
                dataType: 'number',
                maxValue: 1,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Premature failure rate at 200 h',
                dataType: 'number',
                maxValue: 5,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Power factor',
                dataType: 'number',
                minValue: 0.95,
              },
            ].map(generateId(functionalityRequirementsBaseId)) as Requirement[])
          );

          break;
        }

        case 'directional':
        default: {
          functionalityRequirementsGroup.requirements.push(
            ...([
              {
                title: 'Rated lifetime',
                dataType: 'integer',
                minValue: 2000,
                unit: {
                  id: '',
                  name: 'h',
                },
              },
              {
                title: 'Lumen maintenance at 75% of rated average lifetime',
                dataType: 'integer',
                minValue: 80,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Switching cycle before failure times then rated lifitime expressed in hours',
                dataType: 'integer',
                minValue: 4 * techChars[Variants.Incandescent].timeRate,
              },
              {
                title: 'Starting time',
                dataType: 'number',
                maxValue: 0.2,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Warm up to 60% of lumenus flux',
                dataType: 'number',
                maxValue: 1,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Premature failure rate at 200 h',
                dataType: 'number',
                maxValue: 5,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Power factor',
                dataType: 'number',
                minValue: power <= 25 ? 0.5 : 0.95,
              },
            ].map(generateId(functionalityRequirementsBaseId)) as Requirement[])
          );
        }
      }

      break;
    }

    case Variants.Halogen: {
      switch (lightFlowType) {
        case 'non-directional': {
          functionalityRequirementsGroup.requirements.push(
            ...([
              {
                title: 'Rated lifetime',
                dataType: 'integer',
                minValue: 2000,
                unit: {
                  id: '',
                  name: 'h',
                },
              },
              {
                title: 'Lumen maintenance at 75% of rated average lifetime',
                dataType: 'integer',
                minValue: 85,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Switching cycle before failure times then rated lifitime expressed in hours',
                dataType: 'integer',
                minValue: 4 * techChars[Variants.Halogen].timeRate,
              },
              {
                title: 'Starting time',
                dataType: 'number',
                maxValue: 0.2,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Warm up to 60% of lumenus flux',
                dataType: 'number',
                maxValue: 1,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Premature failure rate at 200 h',
                dataType: 'number',
                maxValue: 5,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Power factor',
                dataType: 'number',
                minValue: 0.95,
              },
            ].map(generateId(functionalityRequirementsBaseId)) as Requirement[])
          );

          break;
        }

        case 'directional':
        default: {
          functionalityRequirementsGroup.requirements.push(
            ...([
              {
                title: 'Rated lifetime',
                dataType: 'integer',
                minValue: 2000,
                unit: {
                  id: '',
                  name: 'h',
                },
              },
              {
                title: 'Lumen maintenance at 75% of rated average lifetime',
                dataType: 'integer',
                minValue: 80,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Switching cycle before failure times then rated lifitime expressed in hours',
                dataType: 'integer',
                minValue: 4 * techChars[Variants.Halogen].timeRate,
              },
              {
                title: 'Starting time',
                dataType: 'number',
                maxValue: 0.2,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Warm up to 60% of lumenus flux',
                dataType: 'number',
                maxValue: 1,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Premature failure rate at 200 h',
                dataType: 'number',
                maxValue: 5,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Power factor',
                dataType: 'number',
                minValue: power <= 25 ? 0.5 : 0.95,
              },
            ].map(generateId(functionalityRequirementsBaseId)) as Requirement[])
          );
        }
      }

      break;
    }

    case Variants.Fluorescent: {
      switch (lightFlowType) {
        case 'non-directional': {
          functionalityRequirementsGroup.requirements.push(
            ...([
              {
                title: 'Survival factor at 6000 h',
                dataType: 'number',
                minValue: 0.7,
              },
              {
                title: 'Lumen maintenance at 2000 h',
                dataType: 'integer',
                minValue: 88,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Lumen maintenance at 6000 h',
                dataType: 'integer',
                minValue: 70,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Switching cycle before failure',
                dataType: 'integer',
                minValue: 0,
                unit: {
                  id: '',
                  name: 'h',
                },
              },
              {
                title: 'Starting time',
                dataType: 'number',
                maxValue: power >= 10 ? 1 : 1.5,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Warm up to 60% of lumenus flux',
                dataType: 'integer',
                maxValue: 40,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Premature failure rate at 400 h',
                dataType: 'integer',
                maxValue: 2,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'UVA + UVB radiation',
                dataType: 'integer',
                maxValue: 2,
                unit: {
                  id: '',
                  name: 'kW/klm',
                },
              },
              {
                title: 'UVC radiation',
                dataType: 'number',
                maxValue: 0.01,
                unit: {
                  id: '',
                  name: 'kW/klm',
                },
              },
              {
                title: 'Power factor',
                dataType: 'number',
                minValue: power <= 25 ? 0.55 : 0.9,
                unit: {
                  id: '',
                  name: 'kW/klm',
                },
              },
              {
                title: 'Colour rendering (Ra)',
                dataType: 'integer',
                maxValue: 80,
                unit: {
                  id: '',
                  name: 'Ra',
                },
              },
            ].map(generateId(functionalityRequirementsBaseId)) as Requirement[])
          );

          break;
        }

        case 'directional':
        default: {
          functionalityRequirementsGroup.requirements.push(
            ...([
              {
                title: 'Survival factor at 6000 h',
                dataType: 'number',
                minValue: 0.7,
              },
              {
                title: 'Lumen maintenance at 2000 h',
                dataType: 'integer',
                minValue: 83,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Lumen maintenance at 6000 h',
                dataType: 'integer',
                minValue: 70,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Switching cycle before failure',
                dataType: 'integer',
                minValue: 0,
                unit: {
                  id: '',
                  name: 'h',
                },
              },
              {
                title: 'Starting time',
                dataType: 'number',
                maxValue: power >= 10 ? 1 : 1.5,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Warm up to 60% of lumenus flux',
                dataType: 'integer',
                maxValue: 40,
                unit: {
                  id: '',
                  name: 's',
                },
              },
              {
                title: 'Premature failure rate at  1000 h',
                dataType: 'integer',
                maxValue: 5,
                unit: {
                  id: '',
                  name: '%',
                },
              },
              {
                title: 'Power factor',
                dataType: 'number',
                minValue: power <= 25 ? 0.55 : 0.9,
                unit: {
                  id: '',
                  name: 'kW/klm',
                },
              },
              {
                title: 'Colour rendering (Ra)',
                dataType: 'integer',
                maxValue: 80,
                unit: {
                  id: '',
                  name: 'Ra',
                },
              },
            ].map(generateId(functionalityRequirementsBaseId)) as Requirement[])
          );
        }
      }

      break;
    }

    case Variants.LED:
    default: {
      functionalityRequirementsGroup.requirements.push(
        ...([
          {
            title: 'Survival factor at 6000 h',
            dataType: 'number',
            minValue: 0.9,
          },
          {
            title: 'Lumen maintenance at 6000 h',
            dataType: 'integer',
            minValue: 80,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            title: 'Switching cycle before failure',
            dataType: 'integer',
            minValue: 0,
            unit: {
              id: '',
              name: 'h',
            },
          },
          {
            title: 'Starting time',
            dataType: 'number',
            maxValue: 0.5,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            title: 'Warm up to 95% of lumenus flux',
            dataType: 'number',
            maxValue: 2,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            title: 'Premature failure rate at 1000 h',
            dataType: 'integer',
            maxValue: 5,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            title: 'Power factor',
            dataType: 'number',
            minValue: (power >= 2 && power <= 5 ? 0.4 : power > 5 && power <= 25 ? 0.5 : power > 25 && 0.9) as number,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            title: 'Colour rendering (Ra)',
            dataType: 'integer',
            minValue: 80,
            unit: {
              id: '',
              name: 'Ra',
            },
          },
        ].map(generateId(functionalityRequirementsBaseId)) as Requirement[])
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

  throw new RequestError(400, 'Something wrong...');
};

export default LightingEquipmentAndElectricLamps;
