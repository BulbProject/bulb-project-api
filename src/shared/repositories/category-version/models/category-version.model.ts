import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

import { Category, Timestamp } from '../../../entity';

@Entity({ name: 'categories-versions' })
export class CategoryVersion extends Timestamp {
  @ObjectIdColumn({
    select: false,
  })
  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  public _id: string;

  @Column()
  public version: string;

  @Column()
  public date: string;

  @Column({
    default: 'pending',
  })
  @ApiProperty({
    enum: ['active', 'pending'],
  })
  public status: 'active' | 'pending' = 'pending';

  @Column()
  public category: Category;
}
