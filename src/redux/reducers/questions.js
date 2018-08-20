import { LIST } from 'redux/types/questions';

const initialState = {
  items: [],
  hasMore: true,
  page: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST.success:
      return {
        ...state,
        items: [...state.items, ...action.payload.items],
        hasMore: action.payload.has_more,
        page: action.page,
      };
    default:
      return state;
  }
};
