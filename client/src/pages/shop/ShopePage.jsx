import React, { useEffect } from "react";
import { Routes, Route  } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverviewContainer from "../../components/collections-overview/CollectionsOverview";
import CollectionPageContainer from "../collection/collection.container";

import { fetchCollectionStart } from "../../redux/shop/shop.actions";




const ShopePage = ({ fetchCollectionStart }) => {
  useEffect(() => {
    fetchCollectionStart();
  }, [fetchCollectionStart]);

  return (
    <div className="shop-page">
      <Routes>
        <Route path="/" element={<CollectionsOverviewContainer />} />
        <Route path="/:collectionId" element={<CollectionPageContainer />} />
      </Routes>
    </div>
  );
};



const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart()),
});

export default connect(null, mapDispatchToProps)(ShopePage);
