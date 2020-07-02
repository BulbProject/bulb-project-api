import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column } from 'typeorm';

export class Timestamp {
  @Column('timestamp')
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  public createdAt: string;

  @Column('timestamp')
  @Exclude({ toPlainOnly: true })
  @ApiHideProperty()
  public updatedAt: string;
}
