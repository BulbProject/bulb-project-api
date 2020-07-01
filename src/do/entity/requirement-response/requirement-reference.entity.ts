import { IsString } from 'class-validator';

export class RequirementReference {
  @IsString()
  public id: string;
}
