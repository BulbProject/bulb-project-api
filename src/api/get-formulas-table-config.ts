import { AxiosRequestConfig } from 'axios';

import { documentService } from 'config';

const { url, repo } = documentService;

export const getFormulasTableConfig = (categoryId: string): AxiosRequestConfig => ({
  method: 'get',
  url: `${url}/entries/${repo.owner}/${repo.name}/${repo.branch}/calculation-data%2F${categoryId}/formulas.csv`,
});
