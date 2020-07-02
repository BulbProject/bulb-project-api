import { HttpStatus } from '@nestjs/common';

export const apiException = (response: string, status: HttpStatus) => {
  return {
    schema: {
      type: 'object',
      properties: {
        response: {
          type: 'string',
          example: response,
        },
        status: {
          type: 'integer',
          example: status,
        },
      },
    },
  };
};
