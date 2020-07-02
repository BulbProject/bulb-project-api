import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  public async handleDbError<V>(callback: () => Promise<V>): Promise<V> {
    try {
      return callback();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async handleUndefinedValue<V>(callback: () => Promise<V | undefined>, exceptionMessage: string): Promise<V> {
    const value = await this.handleDbError(callback);

    if (value === undefined) {
      throw new NotFoundException(exceptionMessage);
    }

    return value;
  }
}
