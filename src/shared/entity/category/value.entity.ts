import { IsNumber, IsString } from 'class-validator';

export class Value {
  @IsNumber()
  public amount: number;

  @IsString()
  public currency: string;
}
