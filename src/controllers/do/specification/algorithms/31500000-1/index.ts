//@ts-ignore
import htmlToRtf from 'html-to-rtf';

import refData, { BulbVariants } from 'ref-data';

import errorBuilder from 'lib/error-builder';

import { Criterion, RequirementGroup } from 'types/parts';
import { SpecificationEngine } from '../../types';

const categoryId = '31500000-1';

const html = `
<h1>Title <span style="color:rgb(255,0,0);">with</span> tag h1<h1>
<div>
	<p style="color:#333; margin:5px;" class="test" align="center">
	    text of paragraph <b>text with bold <i>text with italic and bold</i></b><i>text with italic</i>
	</p>
	<p style="color:rgb(255,0,0);" align="right">red paragraph => right with tag</p>
	<p style="color:rgb(0,0,255); text-align:center;">blue paragraph => center with style</p>
	<table>
		<tbody>
			<tr>
                <td><mark>column 1</mark></td>
                <td>column 2</td>
				<td><mark>column 3</mark></td>
				<td>column 4</td>
			</tr>
			<tr>
				<td>content 1</td>
				<td>content 2<br></td>
				<td>content 3<br></td>
				<td>content 4<br></td>
			</tr>
		</tbody>
	</table>
</div>
`;

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
    id: '010100',
    requirements: [],
  };

  efficacyRequirementsGroup.requirements.push({
    id: '010101',
    title: 'Maximum rated power (Pmax) for a given rated luminous flux (Φ)',
    expectedValue: +(0.6 * (0.88 * Math.sqrt(lightFlowValue) + 0.049 * lightFlowValue) * PmaxCor).toFixed(2),
    unit: {
      id: '',
      name: 'W',
    },
  });

  const efficacyCriterion: Criterion = {
    id: '010000',
    title: 'Efficacy Requirements',
    requirementGroups: [efficacyRequirementsGroup],
  };

  const functionallyRequirementsGroup: RequirementGroup = {
    id: '020100',
    requirements: [],
  };

  if (relatedItem === BulbVariants.Incandescent) {
    if (lightFlowType === 'non-directional') {
      functionallyRequirementsGroup.requirements.push(
        ...[
          {
            id: '020101',
            title: 'Rated lifetime',
            dataType: 'integer' as const,
            minValue: 2000,
            unit: {
              id: '',
              name: 'h',
            },
          },
          {
            id: '020102',
            title: 'Lumen maintenance at 75% of rated average lifetime',
            dataType: 'integer' as const,
            minValue: 85,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '020103',
            title: 'Switching cycle before failure times then rated lifitime expressed in hours',
            dataType: 'integer' as const,
            minValue: 4 * techChars[BulbVariants.Incandescent].timeRate,
          },
          {
            id: '020104',
            title: 'Starting time',
            dataType: 'number' as const,
            maxValue: 0.2,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '020105',
            title: 'Warm up to 60% of lumenus flux',
            dataType: 'number' as const,
            maxValue: 1,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '020106',
            title: 'Premature failure rate at 200 h',
            dataType: 'number' as const,
            maxValue: 5,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '020107',
            title: 'Power factor',
            dataType: 'number' as const,
            minValue: 0.95,
          },
        ]
      );
    }

    if (lightFlowType === 'directional') {
      functionallyRequirementsGroup.requirements.push(
        ...[
          {
            id: '020101',
            title: 'Rated lifetime',
            dataType: 'integer' as const,
            minValue: 2000,
            unit: {
              id: '',
              name: 'h',
            },
          },
          {
            id: '020102',
            title: 'Lumen maintenance at 75% of rated average lifetime',
            dataType: 'integer' as const,
            minValue: 80,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '020103',
            title: 'Switching cycle before failure times then rated lifitime expressed in hours',
            dataType: 'integer' as const,
            minValue: 4 * techChars[BulbVariants.Incandescent].timeRate,
          },
          {
            id: '020104',
            title: 'Starting time',
            dataType: 'number' as const,
            maxValue: 0.2,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '020105',
            title: 'Warm up to 60% of lumenus flux',
            dataType: 'number' as const,
            maxValue: 1,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '020106',
            title: 'Premature failure rate at 200 h',
            dataType: 'number' as const,
            maxValue: 5,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '020107',
            title: 'Power factor',
            dataType: 'number' as const,
            minValue: power <= 25 ? 0.5 : 0.95,
          },
        ]
      );
    }
  }

  if (relatedItem === BulbVariants.Halogen) {
    if (lightFlowType === 'non-directional') {
      functionallyRequirementsGroup.requirements.push(
        ...[
          {
            id: '020101',
            title: 'Rated lifetime',
            dataType: 'integer' as const,
            minValue: 2000,
            unit: {
              id: '',
              name: 'h',
            },
          },
          {
            id: '020102',
            title: 'Lumen maintenance at 75% of rated average lifetime',
            dataType: 'integer' as const,
            minValue: 85,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '020103',
            title: 'Switching cycle before failure times then rated lifitime expressed in hours',
            dataType: 'integer' as const,
            minValue: 4 * techChars[BulbVariants.Halogen].timeRate,
          },
          {
            id: '020104',
            title: 'Starting time',
            dataType: 'number' as const,
            maxValue: 0.2,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '020105',
            title: 'Warm up to 60% of lumenus flux',
            dataType: 'number' as const,
            maxValue: 1,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '020106',
            title: 'Premature failure rate at 200 h',
            dataType: 'number' as const,
            maxValue: 5,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '020107',
            title: 'Power factor',
            dataType: 'number' as const,
            minValue: 0.95,
          },
        ]
      );
    }

    if (lightFlowType === 'directional') {
      functionallyRequirementsGroup.requirements.push(
        ...[
          {
            id: '020101',
            title: 'Rated lifetime',
            dataType: 'integer' as const,
            minValue: 2000,
            unit: {
              id: '',
              name: 'h',
            },
          },
          {
            id: '020102',
            title: 'Lumen maintenance at 75% of rated average lifetime',
            dataType: 'integer' as const,
            minValue: 80,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '020103',
            title: 'Switching cycle before failure times then rated lifitime expressed in hours',
            dataType: 'integer' as const,
            minValue: 4 * techChars[BulbVariants.Halogen].timeRate,
          },
          {
            id: '020104',
            title: 'Starting time',
            dataType: 'number' as const,
            maxValue: 0.2,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '020105',
            title: 'Warm up to 60% of lumenus flux',
            dataType: 'number' as const,
            maxValue: 1,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '020106',
            title: 'Premature failure rate at 200 h',
            dataType: 'number' as const,
            maxValue: 5,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '020107',
            title: 'Power factor',
            dataType: 'number' as const,
            minValue: power <= 25 ? 0.5 : 0.95,
          },
        ]
      );
    }
  }

  if (relatedItem === BulbVariants.Fluorescent) {
    if (lightFlowType === 'non-directional') {
      functionallyRequirementsGroup.requirements.push(
        ...[
          {
            id: '020101',
            title: 'Survival factor at 6000 h',
            dataType: 'number' as const,
            minValue: 0.7,
          },
          {
            id: '020102',
            title: 'Lumen maintenance at 2000 h',
            dataType: 'integer' as const,
            minValue: 88,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '020103',
            title: 'Lumen maintenance at 6000 h',
            dataType: 'integer' as const,
            minValue: 70,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '020104',
            title: 'Switching cycle before failure',
            dataType: 'integer' as const,
            minValue: 0,
            unit: {
              id: '',
              name: 'h',
            },
          },
          {
            id: '020105',
            title: 'Starting time',
            dataType: 'number' as const,
            maxValue: power >= 10 ? 1 : 1.5,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '020106',
            title: 'Warm up to 60% of lumenus flux',
            dataType: 'integer' as const,
            maxValue: 40,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '020107',
            title: 'Premature failure rate at 400 h',
            dataType: 'integer' as const,
            maxValue: 2,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '020108',
            title: 'UVA + UVB radiation',
            dataType: 'integer' as const,
            maxValue: 2,
            unit: {
              id: '',
              name: 'kW/klm',
            },
          },
          {
            id: '020109',
            title: 'UVC radiation',
            dataType: 'number' as const,
            maxValue: 0.01,
            unit: {
              id: '',
              name: 'kW/klm',
            },
          },
          {
            id: '020110',
            title: 'Power factor',
            dataType: 'number' as const,
            minValue: power <= 25 ? 0.55 : 0.9,
            unit: {
              id: '',
              name: 'kW/klm',
            },
          },
          {
            id: '0201011',
            title: 'Colour rendering (Ra)',
            dataType: 'integer' as const,
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
        ...[
          {
            id: '020101',
            title: 'Survival factor at 6000 h',
            dataType: 'number' as const,
            minValue: 0.7,
          },
          {
            id: '020102',
            title: 'Lumen maintenance at 2000 h',
            dataType: 'integer' as const,
            minValue: 83,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '020103',
            title: 'Lumen maintenance at 6000 h',
            dataType: 'integer' as const,
            minValue: 70,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '020104',
            title: 'Switching cycle before failure',
            dataType: 'integer' as const,
            minValue: 0,
            unit: {
              id: '',
              name: 'h',
            },
          },
          {
            id: '020105',
            title: 'Starting time',
            dataType: 'number' as const,
            maxValue: power >= 10 ? 1 : 1.5,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '020106',
            title: 'Warm up to 60% of lumenus flux',
            dataType: 'integer' as const,
            maxValue: 40,
            unit: {
              id: '',
              name: 's',
            },
          },
          {
            id: '020107',
            title: 'Premature failure rate at  1000 h',
            dataType: 'integer' as const,
            maxValue: 5,
            unit: {
              id: '',
              name: '%',
            },
          },
          {
            id: '020108',
            title: 'Power factor',
            dataType: 'number' as const,
            minValue: power <= 25 ? 0.55 : 0.9,
            unit: {
              id: '',
              name: 'kW/klm',
            },
          },
          {
            id: '020109',
            title: 'Colour rendering (Ra)',
            dataType: 'integer' as const,
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
      ...[
        {
          id: '020101',
          title: 'Survival factor at 6000 h',
          dataType: 'number' as const,
          minValue: 0.9,
        },
        {
          id: '020102',
          title: 'Lumen maintenance at 6000 h',
          dataType: 'integer' as const,
          minValue: 80,
          unit: {
            id: '',
            name: '%',
          },
        },
        {
          id: '020103',
          title: 'Switching cycle before failure',
          dataType: 'integer' as const,
          minValue: 0,
          unit: {
            id: '',
            name: 'h',
          },
        },
        {
          id: '020104',
          title: 'Starting time',
          dataType: 'number' as const,
          maxValue: 0.5,
          unit: {
            id: '',
            name: 's',
          },
        },
        {
          id: '020105',
          title: 'Warm up to 95% of lumenus flux',
          dataType: 'number' as const,
          maxValue: 2,
          unit: {
            id: '',
            name: 's',
          },
        },
        {
          id: '020106',
          title: 'Premature failure rate at 1000 h',
          dataType: 'integer' as const,
          maxValue: 5,
          unit: {
            id: '',
            name: '%',
          },
        },
        {
          id: '020107',
          title: 'Power factor',
          dataType: 'number' as const,
          minValue: (power >= 2 && power <= 5 ? 0.4 : power > 5 && power <= 25 ? 0.5 : power > 25 && 0.9) as number,
          unit: {
            id: '',
            name: '%',
          },
        },
        {
          id: '020108',
          title: 'Colour rendering (Ra)',
          dataType: 'integer' as const,
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

  if (egp === 'prozorro') {
    if (mode === 'json') {
      return [efficacyCriterion, functionallyCriterion];
    }

    if (mode === 'rtf') {
      return htmlToRtf.convertHtmlToRtf(html);
    }
  }
};

export default LightingEquipmentAndElectricLamps;
