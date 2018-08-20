import { LIST } from 'redux/types/questions';

export const list = page => ({
  type: LIST.request,
  page,
});
