import { takeEvery } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';

import { createItem, removeItem, updateItem, findAllItems } from '../services/api';

function* callCreateItem(service, action) {
  const result = yield call(createItem, service, action.item);
  console.log(result);
  yield put({type: "CREATE_ITEM_DONE", result});
}

function* createItemSaga(service) {
  yield* takeEvery("CREATE_ITEM", callCreateItem, service);
}

function* callRemoveItem(service, action) {
  const result = yield call(removeItem, service, action.id);
  console.log(result);
  yield put({type: "REMOVE_ITEM_DONE", result});
}

function* removeItemSaga(service) {
  yield* takeEvery("REMOVE_ITEM", callRemoveItem, service);
}

function* callUpdateItem(service, action) {
  const result = yield call(updateItem, service, action.id, action.newData);
  console.log(result);
  yield put({type: "UPDATE_ITEM_DONE", result});
}

function* updateItemSaga(service) {
  yield* takeEvery("UPDATE_ITEM", callUpdateItem, service);
}

function* callFindAllSaga(service, action) {
  const result = yield call(findAllItems, service);
  console.log(result);
  yield put({type: "FIND_ALL_ITEMS_DONE", result});
}

function* findAllSaga(service) {
  yield* takeEvery("FIND_ALL_ITEMS", callFindAllSaga, service);
}

export default function* root(service) {
  yield [
    fork(createItemSaga, service),
    fork(removeItemSaga, service),
    fork(updateItemSaga, service),
    fork(findAllSaga, service),
  ]
}
