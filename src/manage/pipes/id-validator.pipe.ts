import { Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import buid from 'buid';

import { Category } from '../../shared/entity';

@Injectable()
export class IdValidatorPipe implements PipeTransform {
  public async transform(category: Category): Promise<Category> {
    try {
      await Promise.all([
        buid<Category>({
          path: category,
        }),
        buid<Category>({
          path: category,
          chain: ['conversions', 'coefficients'],
        }),
      ]);

      return category;
    } catch (error) {
      throw new UnprocessableEntityException(JSON.parse(error.message));
    }
  }
}
