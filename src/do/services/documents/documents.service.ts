import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios, { AxiosError } from 'axios';

@Injectable()
export class DocumentsService {
  public constructor(private config: ConfigService) {}

  public async getTable(table: 'formulas' | 'directory', categoryId: string): Promise<string> {
    const url = this.config.get('documents.url');
    const repo = this.config.get('documents.repo');

    try {
      const { data } = await axios.request<{ content: string }>({
        method: 'get',
        url: `${url}/entries/${repo.owner}/${repo.name}/${repo.branch}/calculation-data%2F${categoryId}/${table}.csv`,
      });

      return data.content;
    } catch (error) {
      const { code, message } = error as AxiosError;

      throw new HttpException(`Could not retrieve ${table}: ${message}`, (code as unknown) as HttpStatus);
    }
  }
}
