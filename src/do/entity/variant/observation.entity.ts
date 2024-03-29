import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

import { Unit, Value } from 'shared/entity';
import { IsUnion } from 'shared/validators';

export class Observation {
  @IsString()
  public id: string;

  @IsString()
  @IsOptional()
  public notes?: string;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'number' }, { type: 'integer' }],
  })
  @IsUnion(['string', 'number', 'integer'])
  @IsOptional()
  public measure?: string | number;

  @IsOptional()
  @ValidateNested()
  @Type(() => Value)
  public value?: Value;

  @IsOptional()
  @ValidateNested()
  @Type(() => Unit)
  public unit?: Unit;
}
