import ShopActionTypes from "./shop.types";
import { put, call, takeLatest, all } from "redux-saga/effects";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.config";
import {
  fetchCollectionsFailed,
  fetchCollectionsSuccess,
} from "./shop.actions";

export function* asyncFetchCollections() {
  const collectionRef = firestore.collection("collections");

  try {
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailed(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    asyncFetchCollections
  );
}

export default function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
