import { Injectable } from '@nestjs/common';
import * as csv from 'csv-string';

import { DocumentsService } from '../documents';

@Injectable()
export class CsvService {
  public constructor(private documents: DocumentsService) {}

  public async getTable(table: 'formulas' | 'directory', id: string): Promise<string[][]> {
    return csv.parse(await this.documents.getTable(table, id));
  }
}
