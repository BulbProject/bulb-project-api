import { Injectable } from '@nestjs/common';
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
  PictureRun,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
} from 'docx';

import { Category, Criterion, Item } from '../../../shared/entity';

import { SpecificationBody } from '../../entity';

import { ecoDesignData } from './images-data.json';

@Injectable()
export class DocxGeneratorService {
  private static borders = Object.fromEntries(
    ['start', 'top', 'bottom', 'left', 'right'].map((direction) => [
      direction,
      {
        color: 'ffffff',
        size: 0,
        style: BorderStyle.NONE,
      },
    ])
  );

  private static tableCellStyles = {
    borders: DocxGeneratorService.borders,
    verticalAlign: VerticalAlign.CENTER,
  };

  private static equalColumns = [DocxGeneratorService.indentation(45), DocxGeneratorService.indentation(45)];

  private static differentColumns = [DocxGeneratorService.indentation(70), DocxGeneratorService.indentation(20)];

  private document: Document;

  private ecoDesign: PictureRun;

  /* private static greenProcurement = Media.addImage(
      DocxGeneratorService.document,
      Buffer.from(greenProcurementData, 'base64'),
      DocxGeneratorService.indentation(),
      DocxGeneratorService.indentation()
    ); */

  private static text(
    text: string,
    size?: number
  ): {
    text: string;
    size?: number;
    font: {
      name: 'Arial';
    };
  } {
    return {
      text,
      size,
      font: {
        name: 'Arial',
      },
    };
  }

  private static indentation(multiplier = 1): number {
    return 100 * multiplier;
  }

  private static subLetterHeading(title: string): Paragraph {
    return new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: {
        after: DocxGeneratorService.indentation(2),
      },
      children: [
        new TextRun({
          ...DocxGeneratorService.text(title, 36),
          color: '000000',
        }),
      ],
    });
  }

  private static generateRow(title: string, value: string | number, shadingPresent?: boolean): TableRow {
    const shading = {
      fill: shadingPresent ? 'f3f3f3' : 'ffffff',
      val: ShadingType.CLEAR,
    };

    const margins = {
      top: DocxGeneratorService.indentation(),
      bottom: DocxGeneratorService.indentation(),
    };

    const indent = {
      end: DocxGeneratorService.indentation(),
    };

    return new TableRow({
      height: {
        height: DocxGeneratorService.indentation(4),
        rule: HeightRule.AUTO,
      },
      children: [
        new TableCell({
          ...DocxGeneratorService.tableCellStyles,
          shading,
          margins,
          children: [
            new Paragraph({
              indent,
              children: [new TextRun(DocxGeneratorService.text(` ${title}`))],
            }),
          ],
        }),
        new TableCell({
          ...DocxGeneratorService.tableCellStyles,
          shading,
          margins,
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              indent,
              children: [
                new TextRun({
                  ...DocxGeneratorService.text(`${value}`),
                  bold: true,
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }

  public async generateDocx(
    category: Category,
    selectedVariant: SpecificationBody['selectedVariant'],
    criteria: Criterion[]
  ): Promise<Buffer> {
    this.document = new Document({
      hyperlinks: {
        law1: {
          link: 'https://zakon.rada.gov.ua/laws/show/804-2018-%D0%BF',
          text: '№804 від 03.10.2018',
          type: HyperlinkType.EXTERNAL,
        },
      },
    });

    this.ecoDesign = Media.addImage(
      this.document,
      Buffer.from(ecoDesignData, 'base64'),
      DocxGeneratorService.indentation(),
      DocxGeneratorService.indentation()
    );

    const currentItem = category.items.find((item) => item.id === selectedVariant.relatedItem) || ({} as Item);

    this.document.addSection({
      children: [
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: {
            after: DocxGeneratorService.indentation(2.5),
          },
          children: [
            new TextRun({
              ...DocxGeneratorService.text('Специфікація на товар / послугу', 48),
              color: '000000',
            }),
          ],
        }),

        new Table({
          columnWidths: DocxGeneratorService.equalColumns,
          rows: [
            DocxGeneratorService.generateRow('Конкретна назва предмету закупівлі', category.title, true),
            DocxGeneratorService.generateRow('Деталізований код за ДК: 021-2015', currentItem.classification.id),
            DocxGeneratorService.generateRow(
              'Назва код згідно ДК: 021-2015',
              currentItem.classification.description,
              true
            ),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          spacing: {
            before: DocxGeneratorService.indentation(4),
            after: DocxGeneratorService.indentation(2),
          },
          children: [
            new TextRun({
              ...DocxGeneratorService.text('Технічні, якісні та кількісні показники', 36),
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
              return DocxGeneratorService.generateRow(
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
          columnWidths: DocxGeneratorService.differentColumns,
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  ...DocxGeneratorService.tableCellStyles,
                  children: [
                    DocxGeneratorService.subLetterHeading('Мінімальні значення вимог з екодизайну'),

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
                  borders: DocxGeneratorService.borders,
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [this.ecoDesign],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),

        ...criteria.flatMap((criterion) => {
          return [
            new Paragraph({
              spacing: {
                before: DocxGeneratorService.indentation(3.5),
                after: DocxGeneratorService.indentation(1.75),
              },
              children: [
                new TextRun({
                  ...DocxGeneratorService.text(criterion.title as string, 24),
                  color: '000000',
                  bold: true,
                }),
              ],
            }),

            new Table({
              columnWidths: DocxGeneratorService.equalColumns,
              rows: criterion.requirementGroups
                .flatMap((requirementGroup) => requirementGroup.requirements)
                .map((requirement, index) => {
                  return DocxGeneratorService.generateRow(
                    requirement.title || '',
                    `${requirement.minValue || requirement.expectedValue || requirement.maxValue} ${
                      requirement.unit?.name || ''
                    }`,
                    index % 2 === 0
                  );
                }),
            }),
          ];
        }),

        new Paragraph({
          pageBreakBefore: true,
        }),

        new Table({
          columnWidths: DocxGeneratorService.differentColumns,
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  ...DocxGeneratorService.tableCellStyles,
                  children: [DocxGeneratorService.subLetterHeading('Мінімальні значення вимог зелених закупівель')],
                }),

                new TableCell({
                  borders: DocxGeneratorService.borders,
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [this.ecoDesign],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });

    return Buffer.from(await Packer.toBuffer(this.document));
  }
}
