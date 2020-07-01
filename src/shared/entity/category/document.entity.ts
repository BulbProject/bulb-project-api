import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { IsUnion } from '../../validators';

const documentType = [
  'plannedProcurementNotice',
  'tenderNotice',
  'awardNotice',
  'contractNotice',
  'completionCertificate',
  'procurementPlan',
  'biddingDocuments',
  'technicalSpecifications',
  'evaluationCriteria',
  'evaluationReports',
  'contractDraft',
  'contractSigned',
  'contractArrangements',
  'contractSchedule',
  'physicalProgressReport',
  'financialProgressReport',
  'finalAudit',
  'hearingNotice',
  'marketStudies',
  'eligibilityCriteria',
  'clarifications',
  'shortlistedFirms',
  'environmentalImpact',
  'assetAndLiabilityAssessment',
  'riskProvisions',
  'winningBid',
  'complaints',
  'contractAnnexe',
  'contractGuarantees',
  'subContract',
  'needsAssessment',
  'feasibilityStudy',
  'projectPlan',
  'billOfQuantity',
  'bidders',
  'conflictOfInterest',
  'debarments',
  'illustration',
  'submissionDocuments',
  'contractSummary',
  'cancellationDetails',
];

export class Document {
  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'number' }],
  })
  @IsUnion(['string', 'number'])
  public id: string | number;

  @ApiProperty({
    enum: documentType,
  })
  @IsUnion([documentType, 'string'])
  public documentType?: DocumentType;

  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsString()
  @IsOptional()
  public url?: string;

  @IsString()
  @IsOptional()
  public datePublished?: string;

  @IsString()
  @IsOptional()
  public format?: string;

  @IsString()
  @IsOptional()
  public language?: string;

  @IsString()
  @IsOptional()
  public relatesTo?: string;

  @IsString()
  @IsOptional()
  public relatedItem?: string;
}

export type DocumentType =
  | 'plannedProcurementNotice'
  | 'tenderNotice'
  | 'awardNotice'
  | 'contractNotice'
  | 'completionCertificate'
  | 'procurementPlan'
  | 'biddingDocuments'
  | 'technicalSpecifications'
  | 'evaluationCriteria'
  | 'evaluationReports'
  | 'contractDraft'
  | 'contractSigned'
  | 'contractArrangements'
  | 'contractSchedule'
  | 'physicalProgressReport'
  | 'financialProgressReport'
  | 'finalAudit'
  | 'hearingNotice'
  | 'marketStudies'
  | 'eligibilityCriteria'
  | 'clarifications'
  | 'shortlistedFirms'
  | 'environmentalImpact'
  | 'assetAndLiabilityAssessment'
  | 'riskProvisions'
  | 'winningBid'
  | 'complaints'
  | 'contractAnnexe'
  | 'contractGuarantees'
  | 'subContract'
  | 'needsAssessment'
  | 'feasibilityStudy'
  | 'projectPlan'
  | 'billOfQuantity'
  | 'bidders'
  | 'conflictOfInterest'
  | 'debarments'
  | 'illustration'
  | 'submissionDocuments'
  | 'contractSummary'
  | 'cancellationDetails'
  | string;
