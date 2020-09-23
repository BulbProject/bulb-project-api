import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IdConformanceGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const { categoryId } = context.getArgByIndex(0).params;
    const bodyId = context.switchToHttp().getRequest().body?.id;

    if (bodyId === undefined) {
      throw new BadRequestException(`Can't find parameter 'id' in request body.`);
    }

    if (categoryId !== bodyId) {
      throw new BadRequestException("Path parameter 'categoryId' must correspond to the provided category's 'id'.");
    }

    return true;
  }
}
