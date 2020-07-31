import { CanActivate, ExecutionContext, Injectable, UnprocessableEntityException } from '@nestjs/common';

@Injectable()
export class IdConformanceGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const { categoryId } = context.getArgByIndex(0).params;
    const bodyId = context.switchToHttp().getRequest().body.id;

    if (bodyId === undefined) {
      throw new UnprocessableEntityException(`Incorrect body format`);
    }

    if (categoryId !== bodyId) {
      throw new UnprocessableEntityException("Parameter `categoryId` must correspond to the provided category's id");
    }

    return true;
  }
}
