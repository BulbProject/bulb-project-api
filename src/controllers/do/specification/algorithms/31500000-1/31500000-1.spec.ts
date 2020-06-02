import sut from './31500000-1';
import { category, specificationPayload, specificationResponse } from '../../../../../mocks';

import { specifications } from '../../../../../lib/db/methods';

jest.mock('lib/db/methods');

describe('31500000-1 Specification', () => {
  beforeEach(async () => {
    await sut({
      category,
      version: 'v1',
      selectedVariant: specificationPayload,
      egp: 'prozorro',
      mode: 'json',
    });
  });

  describe('Criteria generation', () => {
    const stringTuple = [expect.any(String), expect.any(String)];

    it('Should generate criteria', () => {
      expect(specifications.add).toHaveBeenCalledTimes(1);
    });

    it('Should generate a tuple of two criteria', () => {
      expect(specifications.add).toHaveBeenCalledWith(
        ...stringTuple,
        expect.arrayContaining([expect.any(Object), expect.any(Object)])
      );
    });

    it('Should generate correct criteria', () => {
      expect(specifications.add).toHaveBeenCalledWith(...stringTuple, [...specificationResponse.criteria]);
    });
  });
});
