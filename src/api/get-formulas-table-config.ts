import { AxiosRequestConfig } from 'axios';

import { documentService } from 'config';

const { url, repo } = documentService;

export const getFormulasTableConfig = (fileName: string): AxiosRequestConfig => ({
  method: 'get',
  url: `${url}/entries/${repo.owner}/${repo.name}/${repo.branch}/formulas/${fileName}.csv`,
});
