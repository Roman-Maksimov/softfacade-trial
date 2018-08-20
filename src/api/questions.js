import { request } from 'utils';

export const list = (page) => request.get(
  `/questions?order=desc&sort=activity&site=stackoverflow&filter=withbody&page=${page}`
);
