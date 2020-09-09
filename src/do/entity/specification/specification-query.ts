import { IsIn } from 'class-validator';

import { Egp } from '../egp';
import { Mode } from '../mode';

export class QueryDto {
  @IsIn(['prozorro'])
  public egp: Egp;

  @IsIn(['json', 'docx'])
  public mode: Mode;
}
