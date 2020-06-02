import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  HeightRule,
  HyperlinkRef,
  HyperlinkType,
  Media,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
} from 'docx';

import { ecoDesignData, greenProcurementData } from './images-data.json';

import type { Item } from 'ts4ocds';
import type { Category } from 'types/data/category';
import type { Criterion } from 'types/parts';
import type { SelectedVariant } from 'types/transactions/selected-variant';

export const generateDocument = async (
  category: Category,
  selectedVariant: SelectedVariant['selectedVariant'],
  criteria: Criterion[]
): Promise<Buffer> => {
  const currentItem = category.items.find((item) => item.id === selectedVariant.relatedItem) || ({} as Item);

  const document = new Document({
    hyperlinks: {
      law1: {
        link: 'https://zakon.rada.gov.ua/laws/show/804-2018-%D0%BF',
        text: '№804 від 03.10.2018',
        type: HyperlinkType.EXTERNAL,
      },
    },
  });

  const borders = Object.fromEntries(
    ['start', 'top', 'bottom', 'left', 'right'].map((direction) => [
      direction,
      {
        color: 'ffffff',
        size: 0,
        style: BorderStyle.NONE,
      },
    ])
  );

  const tableCellStyles = {
    borders,
    verticalAlign: VerticalAlign.CENTER,
  };

  const text = (text: string, size?: number) => ({
    text,
    size,
    font: {
      name: 'Arial',
    },
  });

  const indentation = (multiplier = 1) => 100 * multiplier;

  const equalColumns = [indentation(45), indentation(45)];
  const differentColumns = [indentation(70), indentation(20)];

  const generateRow = (title: string, value: string | number, shadingPresent?: boolean) => {
    const shading = {
      fill: shadingPresent ? 'f3f3f3' : 'ffffff',
      val: ShadingType.CLEAR,
    };

    const margins = {
      top: indentation(),
      bottom: indentation(),
    };

    const indent = {
      end: indentation(),
    };

    return new TableRow({
      height: {
        height: indentation(4),
        rule: HeightRule.AUTO,
      },
      children: [
        new TableCell({
          ...tableCellStyles,
          shading,
          margins,
          children: [
            new Paragraph({
              indent,
              children: [new TextRun(text(` ${title}`))],
            }),
          ],
        }),
        new TableCell({
          ...tableCellStyles,
          shading,
          margins,
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              indent,
              children: [
                new TextRun({
                  ...text(`${value}`),
                  bold: true,
                }),
              ],
            }),
          ],
        }),
      ],
    });
  };

  const ecoDesign = Media.addImage(document, Buffer.from(ecoDesignData, 'base64'), indentation(), indentation());
  const greenProcurement = Media.addImage(
    document,
    Buffer.from(greenProcurementData, 'base64'),
    indentation(),
    indentation()
  );

  const subLetterHeading = (title: string) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: {
        after: indentation(2),
      },
      children: [
        new TextRun({
          ...text(title, 36),
          color: '000000',
        }),
      ],
    });
  };

  document.addSection({
    children: [
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: {
          after: indentation(2.5),
        },
        children: [
          new TextRun({
            ...text('Специфікація на товар / послугу', 48),
            color: '000000',
          }),
        ],
      }),

      new Table({
        columnWidths: equalColumns,
        rows: [
          generateRow('Конкретна назва предмету закупівлі', category.title, true),
          generateRow('Деталізований код за ДК: 021-2015', currentItem.classification?.id as string),
          generateRow('Назва код згідно ДК: 021-2015', currentItem.classification?.description as string, true),
        ],
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        spacing: {
          before: indentation(4),
          after: indentation(2),
        },
        children: [
          new TextRun({
            ...text('Технічні, якісні та кількісні показники', 36),
            color: '000000',
          }),
        ],
      }),

      new Table({
        columnWidths: [4500, 4500],
        rows: selectedVariant.metrics
          .flatMap((metric) => metric.observations)
          .filter(
            (observation) =>
              observation.id !== 'energyEconomy' &&
              observation.id !== 'financeEconomy' &&
              observation.id !== 'serviceLife'
          )
          .map((observation, index) => {
            return generateRow(
              observation.notes || '',
              `${observation.measure || observation.value?.amount} ${
                observation.unit?.name || observation.value?.currency || ''
              }`,
              index % 2 === 0
            );
          }),
      }),

      new Paragraph({
        pageBreakBefore: true,
      }),

      new Table({
        columnWidths: differentColumns,
        rows: [
          new TableRow({
            children: [
              new TableCell({
                ...tableCellStyles,
                children: [
                  subLetterHeading('Мінімальні значення вимог з екодизайну'),

                  new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Згідно постанови КМУ ',
                        italics: true,
                      }),
                      new HyperlinkRef('law1'),
                    ],
                  }),
                ],
              }),

              new TableCell({
                borders,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [ecoDesign],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),

      ...criteria
        .map((criterion) => {
          return [
            new Paragraph({
              spacing: {
                before: indentation(3.5),
                after: indentation(1.75),
              },
              children: [
                new TextRun({
                  ...text(criterion.title as string, 24),
                  color: '000000',
                  bold: true,
                }),
              ],
            }),

            new Table({
              columnWidths: equalColumns,
              rows: criterion.requirementGroups
                .flatMap((requirementGroup) => requirementGroup.requirements)
                .map((requirement, index) => {
                  return generateRow(
                    requirement.title || '',
                    `${requirement.minValue || requirement.expectedValue || requirement.maxValue} ${
                      requirement.unit?.name || ''
                    }`,
                    index % 2 === 0
                  );
                }),
            }),
          ];
        })
        .flat(),

      new Paragraph({
        pageBreakBefore: true,
      }),

      new Table({
        columnWidths: differentColumns,
        rows: [
          new TableRow({
            children: [
              new TableCell({
                ...tableCellStyles,
                children: [subLetterHeading('Мінімальні значення вимог зелених закупівель')],
              }),

              new TableCell({
                borders,
                children: [
                  new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    children: [ecoDesign],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  return Packer.toBuffer(document);
};
