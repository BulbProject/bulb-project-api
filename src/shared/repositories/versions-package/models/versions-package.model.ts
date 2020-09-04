import { Exclude } from 'class-transformer';
import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';

import { Timestamp } from '../../../entity';

@Entity({ name: 'versions-packages' })
export class VersionsPackage extends Timestamp {
  @ObjectIdColumn()
  @ApiHideProperty()
  @Exclude({ toPlainOnly: true })
  public _id: string;

  @Column()
  @Index()
  public id: string;

  @Column()
  public license?: string;

  @Column()
  public publicationPolicy?: string;

  @Column()
  public publishedDate: string;

  @Column()
  public publisher: {
    name: string;
    uri: string;
  };

  @Column()
  public uri: string;

  @Column()
  public version: string;

  @Column()
  public versions: string[];
}
