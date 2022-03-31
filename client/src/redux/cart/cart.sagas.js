import { call, put, takeLatest, all } from "redux-saga/effects"

import UserActionTypes from "../user/user.types"
import { resetCart } from "./cart.actions"


function* clearCart() {
    yield put(resetCart())
}

function* onSignOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCart)
}


export default function* cartSagas() {
    yield all([call(onSignOutSuccess)])
}