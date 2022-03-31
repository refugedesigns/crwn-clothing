import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectIsFetchingCollections} from "../../redux/shop/shop.selectors"
import WithSpinner from "../with-spinner/WithSpinner"
import CollectionsOverview from "./CollectionsOverview"

const mapStateToProps = createStructuredSelector({
  isCollectionLoaded: selectIsFetchingCollections,
});

const CollectionsOverviewContainer = compose(connect(mapStateToProps), WithSpinner) (CollectionsOverview)

export default CollectionsOverviewContainer