import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

const documentType = ['illustration'];

export class Document {
  @IsString()
  public id: string;

  @IsString()
  public title: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsString()
  public url: string;

  @ApiProperty({
    enum: documentType,
  })
  @IsIn(documentType)
  public documentType: DocumentType;

  @IsString()
  @IsOptional()
  public relatesTo?: string;

  @IsString()
  @IsOptional()
  public relatedItem?: string;
}

export type DocumentType = 'illustration';
