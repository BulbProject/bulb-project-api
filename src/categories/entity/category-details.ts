import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CategoryDetails {
  @IsString()
  public id: string;

  @IsString()
  public version: string;

  @IsString()
  public date: string;

  @ApiProperty({
    oneOf: [{ type: 'active' }, { type: 'pending' }],
  })
  public status: string;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public image: string;
}
