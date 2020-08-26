import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

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
    enum: ['illustration'],
  })
  public documentType?: DocumentType;

  @IsString()
  @IsOptional()
  public relatesTo?: string;

  @IsString()
  @IsOptional()
  public relatedItem?: string;
}

export type DocumentType = 'illustration';
