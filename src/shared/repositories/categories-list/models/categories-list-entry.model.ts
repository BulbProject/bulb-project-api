import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

import { Timestamp } from '../../../entity';

@Entity({ name: 'categories-lists' })
export class CategoriesListEntry extends Timestamp {
  @ObjectIdColumn()
  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  public _id: string;

  @Column()
  public id: string;

  @Column()
  public version: string;

  @Column()
  public date: string;
}
