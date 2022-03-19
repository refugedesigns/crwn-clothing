import React, { useEffect, useRef } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from "../../components/collections-overview/CollectionsOverview"
import CategoryPage from "../collection/CollectionPage";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.config";
import { updateCollections } from "../../redux/shop/shop.actions";

const ShopePage = ({ updateCollections }) => {
  const match = useParams()
  const unsubscribeFromSnapshot = useRef(null)

  useEffect(() => {
    const collectionRef = firestore.collection("collections")

    collectionRef.onSnapshot(snapshot => {
      const collections = convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collections)
    })
  }, [updateCollections])

  return (
    <div className="shop-page">
      <Routes>
       <Route path="/" element={<CollectionsOverview />} />
       <Route path="/:collectionId" element={<CategoryPage match={match} />} />
      </Routes>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateCollections: (collections) => dispatch(updateCollections(collections))
})

export default connect(null, mapDispatchToProps)(ShopePage);
