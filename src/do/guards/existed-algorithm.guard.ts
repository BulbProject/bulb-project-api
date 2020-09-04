import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException } from '@nestjs/common';

import { AlgorithmsService } from '../algorithms';

@Injectable()
export class ExistedAlgorithmGuard implements CanActivate {
  public constructor(private algorithms: AlgorithmsService) {}

  public canActivate(context: ExecutionContext): boolean {
    const { categoryId } = context.getArgByIndex(0).params;

    if (!(categoryId in this.algorithms.algorithms)) {
      throw new InternalServerErrorException(`Algorithm for category ${categoryId} does not exist.`);
    }

    return true;
  }
}
