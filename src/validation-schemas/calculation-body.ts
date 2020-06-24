import { array, mixed, object, string } from 'yup';

const id = string().required();

export const calculationBodySchema = object()
  .shape({
    requestedNeed: object()
      .shape({
        id: string().required(),
        requirementResponses: array()
          .of(
            object().shape({
              id,
              value: mixed().required(),
              requirement: object()
                .shape({
                  id,
                })
                .required(),
            })
          )
          .min(1)
          .required(),
      })
      .required(),
  })
  .required();
