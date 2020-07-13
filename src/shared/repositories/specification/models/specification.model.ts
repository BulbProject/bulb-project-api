import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

import { Criterion, Timestamp } from '../../../entity';

@Entity({ name: 'specifications' })
export class Specification extends Timestamp {
  @Column()
  @Index()
  @IsString()
  public id: string;

  @Column()
  @IsString()
  public categoryId: string;

  @Column()
  @IsString()
  public version: string;

  @Column()
  @IsArray()
  @Type(() => Criterion)
  @ValidateNested({
    each: true,
  })
  public criteria: Criterion[];

  @ApiHideProperty()
  @ObjectIdColumn()
  @Exclude({ toPlainOnly: true })
  public readonly _id?: string;
}
