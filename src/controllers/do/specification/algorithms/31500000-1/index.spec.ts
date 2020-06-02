import sut from './index';
import { category, specificationPayload, specificationResponse } from '../../../../../mocks';

import { generateDocument } from './document-generator';

jest.mock('./document-generator');

describe('31500000-1 Specification', () => {
  beforeEach(async () => {
    await sut({
      category,
      version: 'v1',
      selectedVariant: specificationPayload,
      egp: 'prozorro',
      mode: 'docx',
    });
  });

  describe('Criteria generation', () => {
    const objectsTuple = [expect.any(Object), expect.any(Object)];

    it('Should generate criteria', () => {
      expect(generateDocument).toHaveBeenCalledTimes(1);
    });

    it('Should generate a tuple of two criteria', () => {
      expect(generateDocument).toHaveBeenCalledWith(...objectsTuple, expect.arrayContaining(objectsTuple));
    });

    it('Should generate correct criteria', () => {
      expect(generateDocument).toHaveBeenCalledWith(...objectsTuple, [...specificationResponse.criteria]);
    });
  });
});
