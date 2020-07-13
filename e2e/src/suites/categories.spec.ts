import { Category } from '../../../src/shared/entity/category';
import { Document } from '../../../src/shared/entity/category/document.entity';
import { CategoryVersionRepositoryService } from '../../../src/shared/repositories/category-version';
import { CategoryVersion } from '../../../src/shared/repositories/category-version/models';

import { Context } from '../entity';
import { withApp } from '../hooks';

describe('[e2e] /categories', () => {
  const context = {} as Context;

  withApp(context);

  describe('when database is empty', () => {
    it('should return 404 on all routes', async () => {
      ['', '?details=true', '/3150000-1', '/3150000-1/v1'].forEach((path) => {
        return context.request.get(path).expect(404);
      });
    });
  });

  describe('when database has records', () => {
    const document: Document = {
      id: '1',
      url: 'url',
    };

    const category: Category = {
      id: '3150000-1',
      classification: {},
      title: '',
      description: '',
      items: [],
      criteria: [],
      documents: [
        document,
        {
          id: '2',
          relatesTo: 'item',
          relatedItem: '1',
        },
      ],
    };

    describe('/categories (GET)', () => {
      const categoryVersion: CategoryVersion = {
        id: category.id,
        category,
        status: 'pending',
        version: 'v1',
        date: '',
      };

      let categories: CategoryVersionRepositoryService;

      beforeEach(async () => {
        categories = context.app.get(CategoryVersionRepositoryService);

        await categories.createOne(category.id, category);
      });

      describe('?details=true', () => {
        it('should return package of details for each category', () => {
          return context.request
            .get('/categories?details=true')
            .expect(200)
            .expect((response) => {
              expect(response.body).toStrictEqual([
                {
                  id: category.id,
                  description: category.description,
                  image: document.url,
                  status: categoryVersion.status,
                  title: category.title,
                  version: categoryVersion.version,
                  date: expect.any(String),
                },
              ]);
            });
        });
      });

      describe('?details=false', () => {
        it('should return package of categories list entries', () => {
          return context.request
            .get('/categories')
            .expect(200)
            .expect((response) => {
              expect(response.body).toStrictEqual([
                {
                  id: category.id,
                  version: categoryVersion.version,
                  date: expect.any(String),
                },
              ]);
            });
        });
      });

      describe('when several versions of the same category are present', () => {
        beforeEach(async () => {
          await categories.updateVersion(category.id, category);
        });

        it('should return only the last version', () => {
          return context.request
            .get(`/categories`)
            .expect(200)
            .expect((response) => {
              expect(response.body).toStrictEqual([
                {
                  id: category.id,
                  version: 'v2',
                  date: expect.any(String),
                },
              ]);
            });
        });
      });
    });
  });
});
