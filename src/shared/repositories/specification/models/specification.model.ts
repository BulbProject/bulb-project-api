import { Exclude, Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

import { Criterion, Timestamp } from '../../../entity';

@Entity({ name: 'specifications' })
export class Specification extends Timestamp {
  @ObjectIdColumn()
  @Exclude({ toPlainOnly: true })
  public _id: string;

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
}
