import  ShopActionTypes  from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.config";

export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailed = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILED,
    payload: errorMessage
})

 export const asyncFetchCollections = () => {
    return dispatch => {
        const collectionRef = firestore.collection("collections");
        dispatch(fetchCollectionStart())
        
        collectionRef.get().then((snapshot) => {
          const collections = convertCollectionsSnapshotToMap(snapshot);
          dispatch(fetchCollectionsSuccess(collections));
        }).catch(error => dispatch(fetchCollectionsFailed(error.message)));
    }
}