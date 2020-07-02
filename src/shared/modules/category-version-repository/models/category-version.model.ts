import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

import { Category } from '../../../entity';

@Entity({ name: 'categories-versions' })
export class CategoryVersion {
  @ObjectIdColumn({
    select: false,
  })
  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  public _id: string;

  @Column()
  @Index()
  public id: string;

  @Column()
  public version: string;

  @Column()
  public date: string;

  @Column({
    default: 'pending',
  })
  @ApiProperty({
    enum: ['active', 'pending'],
    isArray: true,
  })
  public status: 'active' | 'pending' = 'pending';

  @Column()
  public category: Category;
}
