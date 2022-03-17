import { createSelector } from "reselect";

const selectShopData = (state) => state.shopData;

export const selectCollections = createSelector(
  [selectShopData],
  (shopData) => shopData.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCollection = (collectionParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionParam]
  );
