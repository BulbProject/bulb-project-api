import fs from 'fs';
import path from 'path';

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

import { ecoDesignData } from './images-data';

import type { Item } from 'ts4ocds';
import type { Category } from 'types/data/category';
import type { Criterion } from 'types/parts';
import type { SelectedVariant } from 'types/transactions/selected-variant';

export const generateDocument = async (
  category: Category,
  selectedVariant: SelectedVariant['selectedVariant'],
  criteria: Criterion[]
) => {
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

  const borders = ['start', 'top', 'bottom', 'left', 'right'].reduce((_borders, direction) => {
    return {
      ..._borders,
      [direction]: {
        color: 'ffffff',
        size: 0,
        style: BorderStyle.NONE,
      },
    };
  }, {});

  const generateRow = (title: string, value: string | number, shadingPresent?: boolean) => {
    const shading = {
      fill: shadingPresent ? 'f3f3f3' : 'ffffff',
      val: ShadingType.CLEAR,
    };

    const margins = {
      top: 100,
      bottom: 100,
    };

    const indent = {
      end: 100,
    };

    return new TableRow({
      height: {
        height: 400,
        rule: HeightRule.AUTO,
      },
      children: [
        new TableCell({
          borders,
          shading,
          verticalAlign: VerticalAlign.CENTER,
          margins,
          children: [
            new Paragraph({
              indent,
              children: [
                new TextRun({
                  text: ` ${title}`,
                  font: {
                    name: 'Arial',
                  },
                }),
              ],
            }),
          ],
        }),
        new TableCell({
          borders,
          shading,
          verticalAlign: VerticalAlign.CENTER,
          margins,
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              indent,
              children: [
                new TextRun({
                  text: `${value}`,
                  bold: true,
                  font: {
                    name: 'Arial',
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    });
  };

  const ecoDesign = Media.addImage(document, Buffer.from(ecoDesignData), 100, 100);

  document.addSection({
    children: [
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: {
          after: 250,
        },
        children: [
          new TextRun({
            text: 'Специфікація на товар / послугу',
            color: '000000',
            size: 48,
            font: {
              name: 'Arial',
            },
          }),
        ],
      }),

      new Table({
        columnWidths: [4500, 4500],
        rows: [
          generateRow('Конкретна назва предмету закупівлі', category.title, true),
          generateRow('Деталізований код за ДК: 021-2015', currentItem.classification?.id as string),
          generateRow('Назва код згідно ДК: 021-2015', currentItem.classification?.description as string, true),
        ],
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        spacing: {
          before: 400,
          after: 200,
        },
        children: [
          new TextRun({
            text: 'Технічні, якісні та кількісні показники',
            color: '000000',
            size: 36,
            font: {
              name: 'Arial',
            },
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
        columnWidths: [7000, 2000],
        rows: [
          new TableRow({
            children: [
              new TableCell({
                borders,
                verticalAlign: VerticalAlign.CENTER,
                children: [
                  new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    spacing: {
                      after: 200,
                    },
                    children: [
                      new TextRun({
                        text: 'Мінімальні значення вимог з екодизайну',
                        color: '000000',
                        size: 36,
                        font: {
                          name: 'Arial',
                        },
                      }),
                    ],
                  }),

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
                before: 350,
                after: 175,
              },
              children: [
                new TextRun({
                  text: criterion.title,
                  color: '000000',
                  bold: true,
                  size: 24,
                  font: {
                    name: 'Arial',
                  },
                }),
              ],
            }),

            new Table({
              columnWidths: [4500, 4500],
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
    ],
  });

  return Packer.toBuffer(document);
};
