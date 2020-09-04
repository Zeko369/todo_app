import { ParsedUrlQuery } from 'querystring';

export const getId = (query: ParsedUrlQuery): null | number => {
  if (query.id) {
    if (Array.isArray(query.id)) {
      return parseInt(query.id[0]);
    }

    return parseInt(query.id);
  }

  return null;
};
