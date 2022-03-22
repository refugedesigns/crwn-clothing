import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from "../../components/collections-overview/CollectionsOverview"
import CollectionPage from "../collection/CollectionPage";
import WidthSpinner from "../../components/with-spinner/WithSpinner";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.config";
import { updateCollections } from "../../redux/shop/shop.actions";



const CollectionsOverviewWithSpinner = WidthSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WidthSpinner(CollectionPage)


const ShopePage = ({ updateCollections }) => {
  const [isLoading, setIsLoading] = useState(true)
  const match = useParams()
  const unsubscribeFromSnapshot = useRef(null)

  useEffect(() => {
    const collectionRef = firestore.collection("collections")

    collectionRef.onSnapshot(snapshot => {
      const collections = convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collections)
      setIsLoading(false)
    })
  }, [updateCollections])

  return (
    <div className="shop-page">
      <Routes>
       <Route path="/" element={<CollectionsOverviewWithSpinner isLoading={isLoading} />} />
       <Route path="/:collectionId" element={<CollectionPageWithSpinner isLoading={isLoading} match={match} />} />
      </Routes>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateCollections: (collections) => dispatch(updateCollections(collections))
})

export default connect(null, mapDispatchToProps)(ShopePage);
