import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionsOverview from "../../components/collections-overview/CollectionsOverview";
import CollectionPage from "../collection/CollectionPage";
import WidthSpinner from "../../components/with-spinner/WithSpinner";

import { asycFetchCollections } from "../../redux/shop/shop.actions";
import { selectIsFetchingCollections } from "../../redux/shop/shop.selectors"

const CollectionsOverviewWithSpinner = WidthSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WidthSpinner(CollectionPage);

const ShopePage = ({ isFetching, asyncFetchCollections }) => {
  const match = useParams();

  useEffect(() => {
    asyncFetchCollections();
  }, [])

  return (
    <div className="shop-page">
      <Routes>
        <Route
          path="/"
          element={<CollectionsOverviewWithSpinner isLoading={isFetching} />}
        />
        <Route
          path="/:collectionId"
          element={
            <CollectionPageWithSpinner isLoading={isFetching} match={match} />
          }
        />
      </Routes>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetchingCollections
})

const mapDispatchToProps = dispatch => ({
  asyncFetchCollections: () => dispatch(asycFetchCollections())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopePage);
