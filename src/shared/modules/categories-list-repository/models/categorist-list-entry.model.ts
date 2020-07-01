import { Exclude } from 'class-transformer';
import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'categories-list-entries' })
export class CategoriesListEntry {
  @ObjectIdColumn()
  @Exclude({ toPlainOnly: true })
  public _id: string;

  @Column()
  @Index()
  public id: string;

  @Column()
  public version: string;

  @Column()
  public date: string;
}
