import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios, { AxiosError } from 'axios';

@Injectable()
export class DocumentsService {
  public constructor(private config: ConfigService) {}

  public async getTable(table: string, categoryId: string): Promise<string> {
    const url = this.config.get('documents.url');
    const repo = this.config.get('documents.repo');
    const requestUrl = `${url}/entries/${repo.owner}/${repo.name}/${repo.branch}/calculation-data%2F${categoryId}/${table}.csv`;
    try {
      const { data } = await axios.get<{ content: string }>(requestUrl);

      return data.content;
    } catch (error) {
      const { message, response } = error as AxiosError;

      throw new HttpException(
        `Could not retrieve '${table}' table from url ${requestUrl}. Reason: '${message}'.`,
        response?.status || 500
      );
    }
  }
}
