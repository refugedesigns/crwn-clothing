import { ShopActionTypes } from "./shop.types";

export const updateCollections = (collections) => ({
    type: ShopActionTypes.UPATE_COLLECTIONS,
    payload: collections
})