import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import WithSpinner from "../../components/with-spinner/WithSpinner";
import CollectionPage from "./CollectionPage";

const CollectionPageWithSpinner = WithSpinner(CollectionPage)


const CollectionPageContainer = ({isLoading}) => {
    const match = useParams()
    return <CollectionPageWithSpinner isLoading={isLoading} match={match} />;
}

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionsLoaded(state),
});

export default connect(mapStateToProps)(CollectionPageContainer);;

