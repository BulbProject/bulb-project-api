import { Criterion } from '../../../shared/entity';

import { Variant } from '../variant';

export class AvailableVariant extends Variant {
  public criteria?: Criterion[];
}
