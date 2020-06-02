import { category, specificBulbBody, specificBulbResponse } from '../../../../../mocks';
import algorithm from './index';

test('Test specific bulb case', () => {
  // @ts-ignore @TODO need fix types in ts4ocds dataType in requirement
  expect(algorithm({ category, version: 'v6', requestedNeed: specificBulbBody.requestedNeed })).toEqual(
    specificBulbResponse
  );
});
