import { specifications } from 'lib/db/methods';
import logger from 'lib/logger';
import { category } from 'mocks';

import SpecificationCleaner from './specification-cleaner.service';

jest.mock('lib/logger');

describe('SpecificationCleaner', () => {
  let sut: SpecificationCleaner;
  let specificationId: string;

  describe('Cleaning outdated specifications', () => {
    beforeEach(async () => {
      const { id } = await specifications.add('t31500000-1', 'v2', category.criteria);
      specificationId = id;

      sut = SpecificationCleaner.create({
        runInterval: 1,
        deleteThreshold: 1,
      });

      // await sut.clean('second');
    });

    it('Should clean oudated specification', async () => {
      expect(await specifications.getOne(specificationId)).toBe(null);
    });

    it('Should log count of deleted specifications', () => {
      expect(logger.info).toHaveBeenLastCalledWith(`SpecificationCleaner has deleted 1 outdated specifications.`);
    });
  });
});
