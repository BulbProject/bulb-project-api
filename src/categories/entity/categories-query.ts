import { IsIn, IsOptional } from 'class-validator';

export class QueryDto {
  @IsOptional()
  @IsIn(['true', 'false'])
  public details?: string;
}
