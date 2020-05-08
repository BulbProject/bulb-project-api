import type { AlgorithmEngine } from 'types/algorithmEngine';

// Name of the function is a name of current CPV code
const LightingEquipmentAndElectricLamps: AlgorithmEngine = ({ category, version, requestedNeed }) => {
  return {
    category: category.id,
    version,
    availableVariants: [
      {
        id: '01000000',
        relatedItem: 'item-1',
        quantity: 1,
        forecasts: [
          {
            id: '01010000',
            title: 'Payback Period',
            observations: [
              {
                id: '01010100',
                notes: 'Unit per hours',
                measure: '5',
                unit: {
                  id: '01010101',
                  name: 'hour',
                },
              },
            ],
          },
          {
            id: '01020000',
            title: 'Lifetime Savings / Unit',
            observations: [
              {
                id: '01020100',
                notes: 'Electricity',
                measure: '2.28',
                unit: {
                  id: '01020101',
                  name: 'kWh',
                },
              },
              {
                id: '01020200',
                notes: 'Financial',
                measure: '148.82',
                unit: {
                  id: '01020201',
                  name: 'UAH',
                },
              },
            ],
          },
        ],
        targets: [
          {
            id: '01010000',
            description: 'Beautifulness',
            observations: [
              {
                id: '01010100',
                notes: 'Shininess',
                measure: '100500',
                unit: {
                  id: '123',
                  name: 'bla',
                },
              },
              {
                id: '01010200',
                notes: 'Glowy',
                measure: 'Yes',
                unit: {
                  id: '123',
                  name: 'bla',
                },
              },
            ],
          },
          {
            id: '01020000',
            description: 'Item classification',
            observations: [
              {
                id: '01020100',
                notes: 'Bulb',
                measure: 'Yes',
                unit: {
                  id: '123',
                  name: 'bla',
                },
              },
            ],
          },
        ],
        avgValue: {
          amount: 12,
          currency: 'UAH',
        },
        relatedProducts: ['123'],
      },
      {
        id: '02000000',
        relatedItem: 'item-1',
        quantity: 32,
        forecasts: [
          {
            id: '02010000',
            title: 'Payback Period',
            observations: [
              {
                id: '02010100',
                notes: 'Unit per hours',
                measure: '51',
                unit: {
                  id: '02010101',
                  name: 'hour',
                },
              },
            ],
          },
          {
            id: '02020000',
            title: 'Lifetime Savings / Unit',
            observations: [
              {
                id: '02020100',
                notes: 'Electricity',
                measure: '2.28',
                unit: {
                  id: '02020101',
                  name: 'kWh',
                },
              },
              {
                id: '02020200',
                notes: 'Financial',
                measure: '148.82',
                unit: {
                  id: '02020201',
                  name: 'UAH',
                },
              },
            ],
          },
        ],
        targets: [
          {
            id: '02010000',
            description: 'Beautifulness',
            observations: [
              {
                id: '02010100',
                notes: 'Shininess',
                measure: '100500',
              },
              {
                id: '02010200',
                notes: 'Glowy',
                measure: 'Yes',
              },
            ],
          },
          {
            id: '02020000',
            description: 'Item classification',
            observations: [
              {
                id: '02020100',
                notes: 'Bulb',
                measure: 'Yes',
              },
            ],
          },
        ],
        avgValue: {
          amount: 12,
          currency: 'UAH',
        },
        relatedProducts: ['432'],
      },
    ],
  };
};

export default LightingEquipmentAndElectricLamps;
