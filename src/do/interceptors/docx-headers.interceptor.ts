import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SpecificationResponse } from '../entity/specification';

@Injectable()
export class DocxHeadersInterceptor implements NestInterceptor<SpecificationResponse, SpecificationResponse> {
  public intercept(
    context: ExecutionContext,
    next: CallHandler<SpecificationResponse>
  ): Observable<SpecificationResponse> {
    const { mode } = context.getArgByIndex(0).query;

    if (mode === 'docx') {
      return next.handle().pipe(
        map((data) => {
          const response = context.switchToHttp().getResponse();

          response.status(200);
          response.headers({
            'Content-Disposition': 'attachment;filename="specification.docx"',
            'Content-Description': 'File Transfer',
            'Content-Transfer-Encoding': 'binary',
          });

          return data;
        })
      );
    }

    return next.handle();
  }
}
