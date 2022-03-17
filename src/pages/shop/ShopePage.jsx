import React from "react";
import { Routes, Route, useParams } from "react-router-dom";


import CollectionsOverview from "../../components/collections-overview/CollectionsOverview"
import CategoryPage from "../collection/CollectionPage";

const ShopePage = () => {
  const match = useParams()

  return (
    <div className="shop-page">
      <Routes>
       <Route path="/" element={<CollectionsOverview />} />
       <Route path="/:collectionId" element={<CategoryPage match={match} />} />
      </Routes>
    </div>
  );
};

export default ShopePage;
