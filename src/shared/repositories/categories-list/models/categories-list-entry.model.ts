import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

import { Timestamp } from '../../../entity';

@Entity({ name: 'categories-lists' })
export class CategoriesListEntry extends Timestamp {
  @Column()
  public id: string;

  @Column()
  public version: string;

  @Column()
  public date: string;

  @ObjectIdColumn()
  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  public readonly _id?: string;
}
