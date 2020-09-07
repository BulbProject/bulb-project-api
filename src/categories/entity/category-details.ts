import { ApiProperty } from '@nestjs/swagger';

export class CategoryDetails {
  @ApiProperty({
    oneOf: [{ type: 'active' }, { type: 'pending' }],
  })
  public status: string;

  public id: string;

  public version: string;

  public date: string;

  public title: string;

  public description: string;

  public image?: string;
}
