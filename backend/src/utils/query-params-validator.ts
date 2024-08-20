import { InvalidQueryParamsException } from '../exceptions/invalid-query-params.exception';

export interface QueryParams {
  page?: string;
  limit?: string;
  raFilter?: string;
  sortBy?: { key: string; order: 'asc' | 'desc' };
}

export function validateQueryParams(params: QueryParams) {
  const { page, limit, raFilter, sortBy } = params;

  const pageNumber = page ? parseInt(page, 10) : 1;
  const limitNumber = limit ? parseInt(limit, 10) : 10;

  const errors: string[] = [];

  if (isNaN(pageNumber) || pageNumber < 1) errors.push('Invalid page value');

  if (isNaN(limitNumber) || limitNumber < 1) errors.push('Invalid limit value');

  if (sortBy)
    if (
      !Array.isArray(sortBy) ||
      sortBy.some(
        (sort) =>
          typeof sort !== 'object' ||
          !sort.key ||
          !['asc', 'desc'].includes(sort.order),
      )
    ) {
      errors.push('Invalid sortBy value');
    }

  if (errors.length) throw new InvalidQueryParamsException(errors);

  return {
    page: pageNumber,
    limit: limitNumber,
    raFilter,
    sortBy,
  };
}
