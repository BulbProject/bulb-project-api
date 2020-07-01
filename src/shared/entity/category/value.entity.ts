import { IsNumber, IsOptional, IsString } from 'class-validator';

export class Value {
  @IsNumber()
  @IsOptional()
  public amount?: number;

  @IsString()
  @IsOptional()
  public currency?: string;
}
