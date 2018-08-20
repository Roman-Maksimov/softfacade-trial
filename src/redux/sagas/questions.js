import { takeEvery, call, put } from 'redux-saga/effects';
import { LIST } from 'redux/types/questions';
import Api from 'api';

function* list({ page }) {
  try {
    const payload = yield call(Api.questions.list, page);

    yield put({ type: LIST.success, payload, page });
  } catch (error) {}
}

function* listSaga() {
  yield takeEvery(LIST.request, list);
}

export default [
  listSaga,
];
