import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const apiException = (response: string): { schema: SchemaObject } => {
  return {
    schema: {
      type: 'object',
      properties: {
        response: {
          type: 'string',
          example: response,
        },
      },
    },
  };
};

export enum Exception {
  InternalServerError = 'Internal server error',
}
