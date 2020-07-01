import { Exclude } from 'class-transformer';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'categories-lists' })
export class CategoriesListEntry {
  @ObjectIdColumn()
  @Exclude({ toPlainOnly: true })
  public _id: string;

  @Column()
  public id: string;

  @Column()
  public version: string;

  @Column()
  public date: string;
}
